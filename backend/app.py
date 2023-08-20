from flask import Flask,jsonify,request

import pickle
import pandas as pd
import requests
import json 
from flask_cors import CORS



movies=pickle.load(open('../movies.pkl','rb'))
similarity=pickle.load(open('../similarity.pkl','rb'))
# movies
def fetch_poster(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path

def recommend(movie):
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movie_names = []
    recommended_movie_posters = []
    for i in distances[1:6]:
        # fetch the movie poster
        movie_id = movies.iloc[i[0]].movie_id
        recommended_movie_posters.append(fetch_poster(movie_id))
        recommended_movie_names.append(movies.iloc[i[0]].title)

    return recommended_movie_names,recommended_movie_posters

# 
# Initializing flask app
app = Flask(__name__)
CORS(app)
@app.route('/recommend', methods =['POST'])
def get_movie():
 
    data = request.get_json()
    mvi=data['data']
    
    lsm,lsp=recommend(mvi)
    
    return jsonify(movie=lsm,poster=lsp)

# # Route for seeing a data
# @app.route('/data')
# def home():
    

	
# # Running app
if __name__ == '__main__':
	app.run(debug=True)

