import pickle
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

#####################################
###      modify the i/o paths     ###
#####################################
input_file_path = 'data/comments.csv'
output_file_path = os.path.join(os.path.dirname(__file__), 'out_test.csv')
#####################################
###      modify the i/o paths     ###
#####################################
def main():
    print(os.path.dirname(__file__))
    print('loading previous model')
    with open(os.path.join(os.path.dirname(__file__), 'pickle/model.pkl'), 'rb') as f:
        lin_clf = pickle.load(f)
    with open(os.path.join(os.path.dirname(__file__), 'pickle/tfidf.pkl'), 'rb') as f:
        tfidfvectorizer = pickle.load(f)


    df = pd.read_csv(os.path.join(os.path.dirname(__file__), input_file_path))
    comments = df.comment_content
    X_test = tfidfvectorizer.transform(comments)
    result = lin_clf.predict(X_test)
    df['PREDICTION'] = result
    df.to_csv(output_file_path, index=False)

if __name__ == '__main__':
    main()