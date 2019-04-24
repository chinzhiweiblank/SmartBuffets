#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <HX711_ADC.h>
#include <EEPROM.h>

//wifi ssid and password
const char* ssid = "AndroidAP";
const char* password = "hello1234";

// Host is subjeted to change depending on IPv4 Address
const char* host = "http://192.168.0.103:5005/post";

//HX711 constructor (dout pin, sck pin):
HX711_ADC LoadCell(4, 5);

int eepromAdress = 0;
float weight = 0;
long t;

//default calibration of weighing scale based on stored calibration values
void defaultCalibration(){
  Serial.println("Using stored calibration values");
  float stored_c = 0;
  #if defined(ESP8266) 
  EEPROM.begin(512);
  #endif
  EEPROM.get(eepromAdress, stored_c);
  LoadCell.setCalFactor(stored_c);
  }

//calibration of weighing scale based on user inputs
void calibrate() {
  Serial.println("***");
  Serial.println("Start calibration:");
  Serial.println("It is assumed that the mcu was started with no load applied to the load cell.");
  Serial.println("Now, place your known mass on the loadcell,");
  Serial.println("then send the weight of this mass (i.e. 100.0) from serial monitor.");
  float m = 0;
  boolean f = 0;
  t = millis();

  //get user input as the actual weight of object on weighing scale
  while (f == 0) {
    LoadCell.update();
    if (Serial.available() > 0) {
      m = Serial.parseFloat();
      if (m != 0) {
        Serial.print("Known mass is: ");
        Serial.println(m);
        f = 1;
      }
      else {
        Serial.println("Invalid value");
      }
    }
    else if (millis() > t + 7000){
        defaultCalibration();
        return;
      }
    }
  //calculates calibration factor and stores it
  float c = LoadCell.getData() / m;
  LoadCell.setCalFactor(c);
  Serial.print("Calculated calibration value is: ");
  Serial.print(c);
  Serial.println(", use this in your project sketch");
  f = 0;
  Serial.print("Save this value to EEPROM adress ");
  Serial.print(eepromAdress);
  Serial.println("? y/n");
  while (f == 0) {
    if (Serial.available() > 0) {
      char inByte = Serial.read();
      if (inByte == 'y') {
        #if defined(ESP8266) 
        EEPROM.begin(512);
        #endif
        EEPROM.put(eepromAdress, c);
        #if defined(ESP8266)
        EEPROM.commit();
        #endif
        EEPROM.get(eepromAdress, c);
        Serial.print("Value ");
        Serial.print(c);
        Serial.print(" saved to EEPROM address: ");
        Serial.println(eepromAdress);
        f = 1;

      }
      else if (inByte == 'n') {
        Serial.println("Value not saved to EEPROM");
        f = 1;
      }
    }
  }
  Serial.println("End calibration");
  Serial.println("For manual edit, send 'c' from serial monitor");
  Serial.println("***");
}

//change of stored calibration factor
void changeSavedCalFactor() {
  float c = LoadCell.getCalFactor();
  boolean f = 0;
  Serial.println("***");
  Serial.print("Current value is: ");
  Serial.println(c);
  Serial.println("Now, send the new value from serial monitor, i.e. 696.0");
  int x = 0;
  while (f == 0) {
    delay(5000);
    if (Serial.available() > 0) {
      c = Serial.parseFloat();
      if (c != 0) {
        Serial.print("New calibration value is: ");
        Serial.println(c);
        LoadCell.setCalFactor(c);
        f = 1;
      }
      else {
        Serial.println("Invalid value, exit");
        return;
      }
    }
  }
  f = 0;
  Serial.print("Save this value to EEPROM adress ");
  Serial.print(eepromAdress);
  Serial.println("? y/n");
  while (f == 0) {
    if (Serial.available() > 0) {
      char inByte = Serial.read();
      if (inByte == 'y') {
        #if defined(ESP8266)
        EEPROM.begin(512);
        #endif
        EEPROM.put(eepromAdress, c);
        #if defined(ESP8266)
        EEPROM.commit();
        #endif
        EEPROM.get(eepromAdress, c);
        Serial.print("Value ");
        Serial.print(c);
        Serial.print(" saved to EEPROM address: ");
        Serial.println(eepromAdress);
        f = 1;
      }
      else if (inByte == 'n') {
        Serial.println("Value not saved to EEPROM");
        f = 1;
      }
    }
  }
  Serial.println("End change calibration value");
  Serial.println("***");
}



void setup()
{
  Serial.begin(9600);
  Serial.println();
  // Connect to wifi
  Serial.printf("Connecting to %s ", ssid); 
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected");
  // Start load cell
  Serial.println("Starting load sensor...");
  LoadCell.begin();
  long stabilisingtime = 2000; // tare precision can be improved by adding a few seconds of stabilising time
  LoadCell.start(stabilisingtime);
  if (LoadCell.getTareTimeoutFlag()) {
    Serial.println("Tare timeout, check MCU>HX711 wiring and pin designations");
  }
  else {
    LoadCell.setCalFactor(1.0); // user set calibration value (float)
    Serial.println("Startup + tare is complete");
  }
  while (!LoadCell.update());
  calibrate();
}


void loop(){ 
    //update() should be called at least as often as HX711 sample rate; >10Hz@10SPS, >80Hz@80SPS
  //longer delay in sketch will reduce effective sample rate (be carefull with delay() in the loop)
  LoadCell.update();

  // Get smoothed value from the load data detected
  if (millis() > t + 500) {
    weight = LoadCell.getData();
    Serial.print("Load_cell output val: ");
    Serial.println(weight);
    t = millis();

    Serial.printf("\n[Connecting to %s ... ]", host);
    if(WiFi.status()== WL_CONNECTED){ 
    // Generate json message (to be sent later)
      StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
      JsonObject& JSONencoder = JSONbuffer.createObject();
      JSONencoder["Weight"] = String(weight);
      JSONencoder["Food"] = "mushrooms"; //sample data generated (NOT detected by load sensor)
      char JSONmessageBuffer[300];
      JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
      Serial.println("");
      Serial.println(JSONmessageBuffer);
  
  
  
      HTTPClient http; //Declare object of class HTTPClient
      http.begin(host);
      http.addHeader("Content-Type", "application/json");
      int httpCode = http.POST(JSONmessageBuffer); //send json message to server
      String payload = http.getString(); //Get the response payload
      Serial.println(httpCode); //Print HTTP return code
      Serial.println(payload); //Print request response payload
      http.end();
    }
    else {
    Serial.println("not connected!");
    }
    
  }

  //receive from serial terminal
  if (Serial.available() > 0) {
//    float weight;
    char inByte = Serial.read();
    if (inByte == 't') {
      LoadCell.tareNoDelay();
      }
    else if (inByte == 'c') changeSavedCalFactor();
  }

  //check if last tare operation is complete
  if (LoadCell.getTareStatus() == true) {
    Serial.println("Tare complete");
  }

  delay(500);
}
