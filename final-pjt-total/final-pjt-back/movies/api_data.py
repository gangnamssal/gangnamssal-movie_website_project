import requests
import json

# # # popularMovie - url
# API_KEY = '42584510a0a43e09681fec8c6f36f050'
# language = 'ko-kr'
# page = '1'
# url = 'https://api.themoviedb.org/3/movie/popular'

# def get_data(url, PAGE):
#     API_URL = f'{url}?api_key={API_KEY}&language={language}&page={PAGE}'
#     return API_URL


# new_list = []
# for i in range(1,5):
#     get_data(url, i)
#     response = requests.get(get_data(url,i)).json()

#     for data in response['results']:
#         new_data = {'model' : 'movies.movie'}
#         new_data['pk'] = data['id']
#         new_data['fields'] = {}
#         new_data['fields']['title'] = data['title']
#         new_data['fields']['release_date'] = data['release_date']
#         new_data['fields']['adult'] = data['adult']
#         new_data['fields']['overview'] = data['overview']
#         new_data['fields']['popularity'] = data['popularity']
#         new_data['fields']['poster_path'] = data['poster_path']
#         # new_data['fields']['innermovie_id'] = data['id']
#         new_list.append(new_data)
#         print(new_data)

# with open('movies/fixtures/movies.json', 'a', encoding='UTF-8') as f:
#     json.dump(new_list, f, ensure_ascii=False, indent=2)


# # genre - url
# url = 'https://api.themoviedb.org/3/genre/movie/list'

# def get_data(url):
#     API_URL = f'{url}?api_key={API_KEY}&language={language}'
#     return API_URL

# response = requests.get(get_data(url)).json()

# # print(response['genres'])

# new_list = []

# for data in response['genres']:
#     new_data = {'model' : 'movies.genre'}
#     new_data['pk'] = data['id']
#     new_data['fields'] = {}
#     new_data['fields']['name'] = data['name']
#     new_list.append(new_data)
# print(new_data)

# with open('movies/fixtures/genre.json', 'w', encoding='UTF-8') as f:
# 	json.dump(new_list, f, ensure_ascii=False, indent=2)

# genre & popular






