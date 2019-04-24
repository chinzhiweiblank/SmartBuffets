"""
This file is for training the models: LSTM and Attention-Based Models. Training will save the weights in the file_path desired, which can be loaded.
"""
# Modules for Data Manipulation
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import math
import os


# Modules for Models
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout, GRU, Input
from keras.layers import GlobalAveragePooling1D, GlobalMaxPooling1D, concatenate, SpatialDropout1D
from keras.layers import BatchNormalization, Conv1D, MaxPooling1D
from keras.models import Model, load_model
from keras import initializers, regularizers, constraints, optimizers, layers, callbacks
from keras import backend as K
from keras.engine import InputSpec, Layer
from keras.optimizers import Adam, SGD
from attention import Attention, build_attention_model
from keras.callbacks import ModelCheckpoint, TensorBoard, Callback, EarlyStopping, ReduceLROnPlateau
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 


# Function to load Train_Data
def train_data(file_location = 'data/food_data.csv'):
	dataset = pd.read_csv(file_location, index_col='Time', parse_dates=['Time'])
	train_data, test_data = dataset[:1750], dataset[1750:]
	training_set = train_data.iloc[:,0:1].values
	test_set = test_data.iloc[:,0:1].values
	#print(training_set.shape)
	#print(test_set.shape)
	return training_set, test_set
	
#train_data()
	
# Extremely important function that defines the shape of the input_layer of the neural network for prediction and attention.py to use
def set_size():
	x, y = train_data()
	return x.shape[0], x.shape[1]


# Preprocessing of Data Starts here
def train_preprocessing(training_set):
	scaler = MinMaxScaler()
	training_set_scaled = scaler.fit_transform(training_set)
	X_train = []
	y_train = []
	for i in range(60,training_set_scaled.shape[0]):
		X_train.append(training_set_scaled[i-60:i,0])
		y_train.append(training_set_scaled[i,0])
	X_train, y_train = np.array(X_train), np.array(y_train)

	# Reshaping X_train for efficient modelling
	X_train = np.reshape(X_train, (X_train.shape[0],X_train.shape[1],1))
	return scaler, X_train, y_train


# Creation and Training of Attention-Based Model. Requires input of file_path to save model weights.
def training_attention_model(attention_file_path = "model_checkpoint/best_attention_model.hdf5"):
	# Calling Prior Functions to process the data
	training_set, test_set = train_data()
	X_train, y_train = train_preprocessing(training_set)
	check_point = ModelCheckpoint(attention_file_path, monitor = "val_mean_squared_error", verbose = 1,
                              save_best_only = True, mode = "min")
	early_stop = EarlyStopping(monitor = "val_mean_squared_error", mode = "min", patience = 10)
	attention_model = build_attention_model(X_train, lr = 1e-3, lr_d = 1e-7, units = 128, spatial_dr = 0.3, dense_units=25, dr=0.1, use_attention=True)
	attention_model.fit(X_train, y_train, batch_size = 60, epochs = 50, validation_split=0.1, verbose = 1, callbacks = [check_point, early_stop])
	print("Attention Model Trained. Best Model Weights Saved to {}".format(attention_file_path))


# Creation and Training of LSTM-GRU Model. 
def build_LSTM_model(X_train):
	model = Sequential()
	
	# First layer with Dropout regularisation
	model.add(GRU(units=50, return_sequences=True, input_shape=(X_train.shape[1],1), activation='relu'))
	model.add(Dropout(0.2))
	
	# Second layer
	model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1],1), activation='relu'))
	model.add(Dropout(0.2))
	
	# Third layer
	model.add(GRU(units=50, return_sequences=True, input_shape=(X_train.shape[1],1), activation='relu'))
	model.add(Dropout(0.2))
	
	# Fourth layer
	model.add(LSTM(units=50, activation='relu'))
	model.add(Dropout(0.2))
	
	# Output layer
	model.add(Dense(units=1))
	
	# Compiling the RNN
	model.compile(optimizer = SGD(lr=0.01, decay=1e-7, momentum=0.9, nesterov=False), metrics = ["mean_squared_error"], loss='mean_squared_error')
	
	return model


def create_LSTM_model(X_train, file_path = "model_checkpoint/best_model.hdf5"):
	model.load_model(weights_location)
	return model


def training_model(file_path = "model_checkpoint/best_model.hdf5"):
	training_set, test_set = train_data()
	scaler, X_train, y_train = train_preprocessing(training_set)
	model = build_LSTM_model(X_train)
	
	
    # Training the model and initialising the callbacks: Checkpoint for Saving the Model Weights and EarlyStopping to stop the training should little validation loss be incurred
	check_point = ModelCheckpoint(file_path, monitor = "val_loss", verbose = 1, save_best_only = True, mode = "min")
	early_stop = EarlyStopping(monitor = "val_loss", mode = "min", patience = 30)
	model.fit(X_train,y_train,epochs=50, batch_size=60, validation_split = 0.3, verbose = 1, callbacks= [check_point])
	
	print("LSTM-GRU Model Trained. Best Model Weights Saved to {}".format(file_path))
	
#training_attention_model()
#training_model()
#print(set_size())
