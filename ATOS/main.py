""" This is the main Flask Server.
"""
# Modules for Flask Server
from flask import Flask,request,render_template,jsonify
import datetime
import csv
import socket
import glob
import os
import json

# Modules for Data Manipulation
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import math

# Modules from other files
from prediction import *
from training import *

"""
Important Variable: IP address must be correct. This is done either using command prompt
to execute the ipconfig command or using Python's socket module to get the IPv4 address.
"""

global ip_address, port
ip_address = socket.gethostbyname(socket.gethostname())
port = 5005


#import Flask Object
app=Flask(__name__)


#Sets the HTML page for / or default
@app.route('/')
def home():
	return render_template("index.html")

	
#Sets the HTML page for About Section
@app.route('/about')
def about():
	return render_template("about.html")


""" This API URL enables hardware to post to the Flask Server
and appends the time and the value to a CSV file as input into
the machine learning model.
"""
@app.route('/post',methods=['POST'])
def postJsonHandler():
	if request.method == 'POST':
		# JSON packet should contain the food type (E.g. Bolognese, Mushroom) and food weight
		weight = request.json['Weight']
		food_type = request.json['Food']
		time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		fieldnames = ["Time","Weight"]
		
		# For Unit Testing
		if food_type == "Test":
			file_name = "data/test/food_data1.csv"
			with open(file_name, 'a', newline = '') as csvfile:
				writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
				writer.writerow([time, weight])
			print("Post Request Sent")
			print("============================================")
			return "Test weight has been appended. Try GET request to get latest weight"
		
		# Checks whether food type is in list of foods
		food_list = ["Bolog", "Blueb", "Mushr", "Mexic"]
		if food_type not in food_list:
			return "Food not in list"
		
		""" Checks whether directory belonging to food type is empty
		Creates new CSV file to append data to if so.
		"""
		if not(os.listdir("data/" + i)):
			file_name = "data/" + i + "food_data1.csv"
			with open(file_name, 'a', newline = '') as csvfile:
				writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
				writer.writerow([time, weight])
				return "No files were found. New file created"
						
						
		"""Glob obtains the list of files in the food directory,
		which are then sorted based on the last time they are modified.
		The last file to be modified will be the one that food weight is appended to.
		The second last file to be modified will be the one that will be used to train the
		model.
		"""
		list_of_files = glob.glob('data/' + str(food_type) + '/*.csv')
		list_of_files.sort(key = os.path.getmtime)
		if len(list_of_files)>1:
			train_file = list_of_files[-2]
		file_name = list_of_files[-1]
		
		
		""" Should the increase in food weight exceed 40% of the original food weight,
		a new file will be created and the previous file will be used to train the model.
		The file format would, in this or test cases, be food_data1.csv or food_data2.csv.
		The numbers will change so that new files can be created and old files can be used
		to train the model. Since the predictions will only begin when the data is sufficient,
		the time will be used to train the model and ensure it obtains information gain from the
		data obtained.
		"""
		first_line, last_line = data.iloc[0].Weight, data.iloc[-1].Weight
		data = pd.read_csv(file_name)
		if(weight - last_line >=0.4*first_line):
			train_data(train_file)
			file_name = file_name.replace("\\", "/").split("/")[2][9:-4]
			with open(file_name, 'a', newline='') as csvfile:
				writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
				writer.writerow(["Time", "Weight"])
				writer.writerow([time, weight])
				return "POST Request Processed. Weight added"
		with open(file_name, 'a', newline='') as csvfile:
			writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
			writer.writerow([time, weight])
		return "POST Request Processed. Weight added"


#For processing GET Requests and Sequence Generation
@app.route('/retrieve')
def retrieve():
	food_list = ["Bolog", "Blueb", "Mushr", "Mexic"]
	food_dictionary = {}
	for i in food_list:
		#file_path = os.path.getctime("data/" + i)
		list_of_files = glob.glob('data/' + i + '/*')
		list_of_files.sort(key = os.path.getmtime)
		file_path = list_of_files[-1]
		dataset = pd.read_csv(file_path)
		temp_array = []
		while(len(dataset.Weight)<1750):
			for j in range(len(dataset.Weight)):
				secondary_array = []
				secondary_array.append(dataset.Weight[j])
				secondary_array.append(dataset.Time[j])
				temp_array.append(secondary_array)
			food_dictionary[i] = temp_array
			json_return = json.dumps(food_dictionary)
			return json_return
		else:
			final(i)
			dataset = pd.read_csv("predictions/" + i + "/predict_data.csv")
			for j in range(len(dataset.Weight)):
				secondary_array = []
				secondary_array.append(dataset.Weight[j])
				secondary_array.append(dataset.Time[j])
				temp_array.append(secondary_array)
			food_dictionary[i] = temp_array
	json_return = json.dumps(food_dictionary)
	return json_return

# For Unit Testing and the testing of the entire pipeline from posting the results and retrieving the predictions
@app.route('/test_post',methods=['POST'])
def test_postJsonHandler():
	if request.method == 'POST':
		# JSON packet should contain the food type (E.g. Bolognese, Mushroom) and food weight
		weight = request.json['Weight']
		food_type = request.json['Food']
		if food_type!= "test":
			print("This API URL is only for testing.")
			return ("Please change the food_type to test or use the default POST API URL")
		time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		fieldnames = ["Time","Weight"]
		filename = "tests/food_data.csv"
		
		# To handle any resets
		if food_type == "RESET":
			os.remove(filename)
			with open(filename, 'a' , newline = '') as csvfile:
				writer = csv.writer(csvfile, delimiter = ',', quotechar = "|", quoting = csv.QUOTE_MINIMAL)
				writer.writerow(fieldnames)
				writer.writerow([time, weight])
		
		with open(filename, 'a', newline='') as csvfile:
				writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
				writer.writerow([time, weight])
				return "POST Request Processed. Weight added"
		
@app.route('/test_retrieve', methods = ["GET"])
def test_retrieve():
	file_path = "tests/food_data.csv"
	dataset = pd.read_csv(file_path)
	temp_array = []
	food_dictionary = {}
	while(len(dataset.Weight)<1750):
		for j in range(len(dataset.Weight)):
			secondary_array = []
			secondary_array.append(dataset.Weight[j])
			secondary_array.append(dataset.Time[j])
			temp_array.append(secondary_array)
		food_dictionary["test"] = temp_array
		json_return = json.dumps(food_dictionary)
		return json_return
	else:
		final(food_type)
		dataset = pd.read_csv("tests/predictions.csv")
		for j in range(len(dataset.Weight)):
			secondary_array = []
			secondary_array.append(dataset.Weight[j])
			secondary_array.append(dataset.Time[j])
			temp_array.append(secondary_array)
		food_dictionary[i] = temp_array
		json_return = json.dumps(food_dictionary)
		return json_return

@app.route("/reset",methods = ["GET"])
def reset():
	if request.method == "GET":
		food_list = ["Bolog", "Blueb", "Mushr", "Mexic"]
		for i in food_list:
			directory = "data/" + i
			if not os.listdir(directory):
				print("Directory is empty. Creating new CSV file")
				file_path = "data/" + i + "/food_data1.csv"
				time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
				with open(file_path, 'a') as csvfile:
					filewriter = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
					filewriter.writerow(['Time', 'Weight'])
					filewriter.writerow([time, 10])
			else:
				return "Directory has file"

if __name__=="__main__":
	app.run(host = ip_address, port = port, debug = True)
 
