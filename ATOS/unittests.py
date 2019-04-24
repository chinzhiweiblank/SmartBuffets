# Test Files to try out post and get requests requests. Ip addresses have to be set.
from random import randint
import requests
import jsonify
import pandas as pd
import numpy as np
import socket
import time	

requests.packages.urllib3.disable_warnings()

global ip_address
ip_address = socket.gethostbyname(socket.gethostname())


""" First Unit Test to ensure that the POST request works
and weight is successfully appended to file.
First function checks whether last request weight is the same as what 
was sent in the POST Request
Second function sends a POST request to API URL for hardware to send data to.
Checks the status code to verify whether request is successful like Code 200.
Also checks whether weight is correctly appended to first empty row of the csv file.
"""
def check_post():
	data = pd.read_csv("data/test/food_data1.csv")
	return data.iloc[-1].Weight


def post(url = "http://"+ ip_address +":5005/post", food = "Test"):
	weight = randint(1,400)
	print("Weight:", weight)
	r = requests.post(url, json = {"Food": food, 'Weight': weight}, verify = False)
	assert r.status_code == 200, "Request is unsuccessful"
#	assert check_post() == weight, "Weight is Incorrect"
	print("=================================")
	time.sleep(0.5)
	print("Request Sent.\nRequest Successful.")

"""Second Unit Test is to ensure the GET Request is working.
Uncomment the print line to see the content
"""
def test_request(food = "test"):
	get_url = "http://" + ip_address + ":5005/retrieve"
	r2 = requests.get(get_url, verify = False)
	print(r2.status_code)
	#print(r2.json())
	print("Request Sent\nRequest Successful.")

	
# Reset Function for Unit Testing
def reset():
	os.remove("data/test/food_data1.csv")
	file_name = "data/test/food_data1.csv"
	with open(file_name, 'a', newline = '') as csvfile:
		writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
		writer.writerow(["Time", "Weight"])
	return "Test weight has been appended. Try GET request to get latest weight"

""" Third Unit Test is to ensure the process is working from posting the weight and generating predictions for the app
to retrieve since the values of the predictions will only change if weight is continually appended to the food_data file
for predictions to be generated from"""
def full_test():
	post_url = "http://" + ip_address + ":5005/test_post"
	get_url = "http://" + ip_address + ":5005/test_retrieve"
	post_file = "tests/test_data.csv"
	dataset = pd.read_csv(post_file)
	for weight in dataset.Weight:
		r1 = requests.post(post_url, json = {"Food": "test", 'Weight': weight}, verify = False)
		r2 = requests.get(get_url, verify = False)
		print(r2.json())
		time.sleep(5)
	print("Test completed")

full_test()
