import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

#####################################
###      modify the i/o paths     ###
#####################################
input_file_path = './data/test.csv'
output_file_path = './out_test.csv'
#####################################
###      modify the i/o paths     ###
#####################################

if __name__ == '__main__':
    print('loading previous model')
    with open('./pickle/model.pkl', 'rb') as f:
        lin_clf = pickle.load(f)
    with open('./pickle/tfidf.pkl', 'rb') as f:
        tfidfvectorizer = pickle.load(f)


    df = pd.read_csv(input_file_path)
    comments = df.CONTENT
    X_test = tfidfvectorizer.transform(comments)
    result = lin_clf.predict(X_test)
    df['PREDICTION'] = result
    df.to_csv(output_file_path, index=False)