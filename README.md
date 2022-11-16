# 과정
## 2022/11/16
1. 기획서 작성
2. 모델 만들기
3. How do I get data from API to database?
   1. api data 받아올 py파일 만들기
   2. pip install requests
   3. import requests
   4. 가져온 데이터에서 우리가 쓸 데이터만 뽑아서 새로운 json파일 생성 성공
```
import requests
import json

API_KEY = '42584510a0a43e09681fec8c6f36f050'
language = 'ko-kr'
page = '1'
url = 'https://api.themoviedb.org/3/movie/popular'

def get_data(url, PAGE):
    API_URL = f'{url}?api_key={API_KEY}&language={language}&page={PAGE}'
    return API_URL


new_list = []
for i in range(1,5):
    get_data(url, i)
    response = requests.get(get_data(url,i)).json()

    for data in response['results']:
        new_data = {'model' : 'movies.movie'}
        new_data['pk'] = data['id']
        new_data['fields'] = {}
        new_data['fields']['title'] = data['title']
        new_data['fields']['release_date'] = data['release_date']
        new_data['fields']['adult'] = data['adult']
        new_data['fields']['overview'] = data['overview']
        new_data['fields']['popularity'] = data['popularity']
        new_data['fields']['poster_path'] = data['poster_path']
        # new_data['fields']['innermovie_id'] = data['id']
        new_list.append(new_data)
        print(new_data)

with open('movies/fixtures/movies.json', 'a', encoding='UTF-8') as f:
    json.dump(new_list, f, ensure_ascii=False, indent=2)
```
   5. 데이터베이스에 저장하고 싶은데 방법을 찾는중
   - 가져온 데이터에서 우리가 쓸 데이터만 뽑아서 새로운 json파일 생성까지는 성공 했으나, 그것을 데이터 베이스에 넣는 과정에서 애를 먹는 중
   - 오류1
  > app_label, model_name = app_label.split('.')

  > ValueError: not enough values to unpack (expected 2, got 1)
    
- 해결:  ` new_data = {'model' : 'movies.movie'}   `
- 'movie'를 'movies.movie' 로 고침
- 오류2
> NULL constraint failed: movies_movie.release_date

- 해결: ` new_data['fields']['release_date'] = data['release_date']`
- :을 =로 고침
- migrate를 잘하자
- 오류3
> 데이터 베이스에 id가 1번부터 순서대로 저장된다.
- 해결: ` new_data['pk'] = data['id']`

4. serializer
- 오류1
> .accepted_renderer not set on Response

해결: 데코레이터를 달아준다 *@도 까먹지 않기*

5. app삭제
- 영화 상세정보에 리뷰를 달고 싶어서 커뮤니티 앱을 지우기로 했다. 리뷰를 커뮤니티 앱이 아닌, 무비 앱에서 모델을 생성 하려고 앱 지우는 방법을 구글링 했다.
> 1. 단계-필요한 코드 및 파일을 안전한 위치로 이동
> 2. 단계-모든 가져 오기 및 파일 경로 수정
> 3. 단계-models.py를 비우고 마이그레이션하기
> 4. 단계-settings.py파일 수정
> 5. 단계-앱 폴더 삭제

6. view.py
