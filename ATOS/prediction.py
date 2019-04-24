
# Modules for Data Manipulation
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import math
import datetime
import os

# Modules for Models
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout, GRU, Input
from keras.layers import GlobalAveragePooling1D, GlobalMaxPooling1D, concatenate, SpatialDropout1D
from keras.layers import BatchNormalization, Conv1D, MaxPooling1D
from keras.models import Model, load_model
from keras import initializers, regularizers, constraints, optimizers, layers, callbacks
from keras import backend as K
from keras.engine import InputSpec, Layer
from keras.optimizers import Adam, SGD
import tensorflow as tf
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

# Global Variables to avoid error for tensor missing
global graph,model
graph = tf.get_default_graph()

# Attention Class and function for building attention module from attention.py
from attention import Attention, build_attention_model, create_attention_model
from training import train_preprocessing, set_size, train_data, build_LSTM_model, create_LSTM_model


# Preprocessing of Data
def preprocessing(file_location = 'data/food_data.csv'):
	dataset = pd.read_csv(file_location, index_col='Time', parse_dates=['Time'])
	x,y = set_size()
	dataset_dates = dataset[x:].index
	dataset = dataset[x:].iloc[:,0:1].values
	scaler, X_train, Y_train = train_preprocessing(dataset)
	return scaler, dataset_dates, X_train, Y_train


# Model Parameters can be obtained from training.py. Create Model Functions load models with weights
def build_model(X_train, use_attention = False):	
	if use_attention == True:
		model = load_model("model_checkpoint/best_attention_model.hdf5")
	else:
		model = load_model("model_checkpoint/best_model.hdf5")
	return model

"""
Since LSTMs store long term memory state, we create a data structure with 60 timesteps and 1 output
For each element, we have 60 previous training set elements. We take the final set of 60 elements
for generating a new sequence of predictions.
"""
def generate_sequence(scaler, X_train, model):
	# Initialising data to be put into the model. Default prediction size is 60.
	initial_sequence = X_train[X_train.shape[0]-1,:]
	prediction_size = 60
	sequence = []
	
	for i in range(prediction_size):
		with graph.as_default():
			new_prediction = model.predict(initial_sequence.reshape(initial_sequence.shape[1],initial_sequence.shape[0],1))
		initial_sequence = initial_sequence[1:]
		initial_sequence = np.append(initial_sequence,new_prediction,axis=0)
		sequence.append(new_prediction)
	sequence = scaler.inverse_transform(np.array(sequence).reshape(prediction_size,1))
	final_sequence = []
	for i in sequence:
		final_sequence.append(i[0])
	return final_sequence
	
	
model = load_model("model_checkpoint/test_best_model.hdf5")

def final(food_type):
	file_path = "predictions/" + str(food_type) + "/predict_data.csv"
	if food_type == "test":
		file_path = "tests/predictions.csv"
	scaler, dates, X_train, Y_train = preprocessing()
	#model = build_model(X_train)
	sequence = generate_sequence(scaler, X_train, model)
	data_path = "data/" + str(food_type) + "/food_data1.csv"
	dataset = pd.read_csv(data_path, parse_dates=['Time'])
	data = dataset.Weight.tolist()
	sequence = data + sequence
	datetime_list = []
	for i in range(1,61):
		datetime_list.append(dataset.Time[-60:].iloc[0]+datetime.timedelta(seconds=20*i))
	temp = list(dataset.Time)+datetime_list 
	data = {"Time": temp, "Weight": sequence}
	df = pd.DataFrame(data, columns = ["Time", "Weight"])
	df.to_csv(file_path, index = False)
	print("Sequence transferred to {}".format(file_path))

if __name__ == "__main__":
	final()
