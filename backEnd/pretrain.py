# Author: Justin Wang
# Date: 03/22/2022

# modules
import numpy as np
import pandas as pd
import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score

# parameters
# Data Source: https://archive.ics.uci.edu/ml/datasets/YouTube+Spam+Collection
num_data = 200
file_path = './data/youtube.csv'
        
# pre-process the data
def buildLists():   
    # GT_label = []
    # comments = []
    df = pd.read_csv(file_path)
    comments = df.CONTENT
    GT_label = df.CLASS

    print("Data size: ", len(comments))

    # split data into training set and testing set
    # data_train = np.array(comments[num_data:])
    # y_train = np.array(GT_label[num_data:])
    # data_test = np.array(comments[:num_data])
    # y_test = np.array(GT_label[:num_data])
    # return data_train, y_train, data_test, y_test
    data = np.array(comments)
    y = np.array(GT_label)
    return data, y

# train the model
def train():
    # data_train, y_train, data_test, y_test = buildLists()
    data, y = buildLists()
    # Tokenize and Vectorize the data using TF-IDF
    tfidfvectorizer = TfidfVectorizer(analyzer='word', stop_words='english', ngram_range=(1,2), min_df=2)
    X_train = tfidfvectorizer.fit_transform(data)
    # X_train = tfidfvectorizer.fit_transform(data_train)
    # X_test = tfidfvectorizer.transform(data_test)

    # Train the Model and test accuracy
    lin_clf = LinearSVC().fit(X_train, y)
    # y_hat = lin_clf.predict(X_test)
    # print('Accuracy: ', accuracy_score(y_test, y_hat))
    return lin_clf, tfidfvectorizer

if __name__ == '__main__':
    clf, tfidfvectorizer = train()
    #save result ref:https://stackoverflow.com/questions/56107259/how-to-save-a-trained-model-by-scikit-learn
    with open('./pickle/model.pkl', 'wb') as f:
        pickle.dump(clf, f)
    with open('./pickle/tfidf.pkl', 'wb') as f2:
        pickle.dump(tfidfvectorizer, f2)
