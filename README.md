# README
## 1. 팀원 정보 및 업무 분담
- 김태헌(조장) : 장고-뷰 연결, 알고리즘 구현, 오류 수정
- 권아진 : 디자인 구성, 리드미작성, 오류 수정
## 2.목표 서비스 구현 및 실제 구현 정도
- 목표 서비스
  - 인기영화/명작/개봉예정작/현재상영작을 TMDB API요청으로 가져와서 보여주기.
  - DB에서 가져온 데이터로 사용자 MBTI와 나이,취향을 고려해 영화를 추천.
  - 우리 사이트에서 인기 있는 영화, 리뷰가 많이 달린 순으로 영화 보여주기.
- 실제 구현 서비스
  - 인기영화/명작/개봉예정작/현재상영작을 TMDB API요청으로 가져와서 보여주기.
  - DB에서 가져온 데이터로 사용자 MBTI와 취향을 고려해 영화를 추천.
  - 우리 사이트에서 인기 있는 영화 추천.
## 3. 데이터 베이스 모델링
[모델링](.\프로젝트\기획서\제목 없는 다이어그램.drawio.png")
## 4. 영화 추천 알고리즘에 대한 기술적 설명
- MBTI : 사용자에게 받은 mbti정보와, 미리 만들어 놓은 mbti 별로 추천 할 장르 배열, 영화의 장르 데이터를 비교하여 영화 추천
```
// store/index.js
  state{
    MbtiTable: {
      'INFP': ['로맨스', '애니메이션', '코미디', '음악', '가족'],
      'ENFP': ['액션', '모험', '코미디', '로맨스', '판타지'],
      'INFJ': ['드라마', '미스터리', 'SF', '모험'],
      'ENFJ': ['로맨스', '코미디', '가족', '액션', '모험', 'SF', '범죄'],
      'INTP': ['SF', '모험', '미스터리', '역사', '다큐멘터리', '범죄'],
      'ENTP': ['코미디', '공포', '스릴러', '모험', '판타지', 'SF', '범죄'],
      'INTJ': ['미스터리', '범죄', '모험', '판타지', 'SF', '전쟁'],
      'ENTJ': ['스릴러', '범죄', '모험', '판타지', '역사', '액션', '공포'],
      'ISFJ': ['다큐멘터리', '역사', '음악', '미스터리', '가족', '로맨스', '코미디'],
      'ESFJ': ['로맨스', '코미디', '미스터리', '범죄', '가족', '애니메이션'],
      'ISTJ': ['범죄', '미스터리', '다큐멘터리', '역사', '서부', '드라마'],
      'ESTJ': ['역사', '서부', '다큐멘터리', '범죄', '가족', '드라마'],
      'ISFP': ['애니메이션', '판타지', '판타지', 'SF'],
      'ESFP': ['음악', '애니메이션', '액션', '판타지', '코미디', '로맨스', '범죄'],
      'ISTP': ['코미디', '애니메이션', '로맨스', '액션', '미스터리'],
      'ESTP': ['액션', '범죄', '다큐멘터리', '미스터리']
    },
    recommandMbtiMovie: null,
  },
  mutations{
        GET_RECOMMAND_MBTI_MOVIE(state) {
      const mbti = state.MbtiTable[state.userProfile.mbti]
      const mbtiGenre = []
      for (let mbtigenre of mbti) {
        for (let genre of state.genres) {
          if (mbtigenre === genre.name) {
            mbtiGenre.push(genre)
          }
        }
      }
      const recommand = []
      state.popularMovie.forEach((movie) => {
        for (let genre of mbtiGenre) {
          if (movie.genre_ids.includes(genre.id)) {
            recommand.push(movie)
          }
        }
      })
      // console.log(recommand)
      state.recommandMbtiMovie = _.sampleSize(recommand, 50)
    },
  },
  actions{
    saveProfile(context, payload) {
      axios({
        method: 'post',
        url: `${DJANGO_URL}/movies/profile/`,
        data: {
          nickname: payload.nickname,
          mbti: payload.mbti,
          prefer_genre: payload.prefer_genre
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          // console.log(res)
          // console.log('성공')
          context.commit('SAVE_PROFILE', res.data)
        })
        .catch((error) => {
          console.log(error)
          // console.log(context.state.selectedPreference)
        })
    },
  }

  movies/models.py
  class Profile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    nickname = models.CharField(max_length=15, blank=True, null=True)
    mbti = models.CharField(max_length=4, blank=True, null=True) #MBTI정보
  ```
- 취향 : 사용자가 선택한 장르를 가진 영화를 가져와 추천
```
store/index.js
state{
    preferenceGenre: null,
    selectedPreference: [],
    totalUserPreferGenre: null,
    userPreferGenre: null,
},
mutations{
      // 선택 안 한 장르
    GET_PREFERENCE_GENRE(state) {
      if (state.preferenceGenre === null) {
        state.preferenceGenre = state.genres
      }
    },
    // 선택한 장르
    SELECTED_PREFERENCE_GENRE(state, seletedGenre) {
      state.preferenceGenre = state.preferenceGenre.filter((genre) => {
        return !(genre.id === seletedGenre.id)
      })
      const data = {
        id: seletedGenre.id,
        name: seletedGenre.name
      }
      state.selectedPreference.push(data)
    },
    // 장르 선택 취소
    DELETE_SELECTED_GENRE(state, seletedGenre) {
      state.selectedPreference = state.selectedPreference.filter((genre) => {
        return !(genre.id === seletedGenre.id)
      })
      const data = {
        id: seletedGenre.id,
        name: seletedGenre.name
      }
      state.preferenceGenre.push(data)
    },
    // 장르 선택 취소
  SELECT_GENRE_EXIT(state) {
    state.selectedPreference = []
    state.preferenceGenre = state.genres
  },
  // 프로필 정보 저장
  SAVE_PROFILE(state, payload) {
    state.userProfile = payload
    state.selectedPreference = []
    state.preferenceGenre = state.genres
  },
  // 프로필 상세 정보
  GET_PROFILE_DETAIL(state, payload) {
    state.userProfile = payload
  },
  // 선택 장르 저장
  SAVE_USER_PREFER_GENRE(state, payload) {
    state.genres = state.genres.map((genre) => {
      if (genre.id === payload.prefer_genre) {
        genre.userprefergenre_set.push(payload)
      }
      return genre
    })
  },
  // 저장된 선택 장르
  GET_USER_PREFER_GENRE(state, payload) {
    state.totalUserPreferGenre = payload
  },
  // 저장된 선택 안 한 장르
  GET_PREFER_GENRE(state) {
    const preferGenre = state.totalUserPreferGenre.filter((genre) => {
      return genre.user === state.userInfo.id
    })
    const genre = []
    for (let i of preferGenre) {
      for (let j of state.genres) {
        if (i.prefer_genre === j.id) {
          genre.push(j.name)
        }
      }
    }
    state.userPreferGenre = genre
  },
  // 취향 추천 영화
  GET_RECOMMAND_GENRE_MOVIE(state) {
    const myGenreId = state.genres.filter((genre) => {
      return state.userPreferGenre.includes(genre.name)
    })
    const recommand = []
    state.popularMovie.forEach((movie) => {
      for (let genre of myGenreId) {
        if (movie.genre_ids.includes(genre.id)) {
          recommand.push(movie)
        }
      }
    })
    // console.log(recommand)
    state.recommandGenreMovie = _.sampleSize(recommand, 50)
  },
actions{
  saveProfile(context, payload) {
      axios({
        method: 'post',
        url: `${DJANGO_URL}/movies/profile/`,
        data: {
          nickname: payload.nickname,
          mbti: payload.mbti,
          prefer_genre: payload.prefer_genre
        },
        headers: {
          Authorization: `Token ${context.state.Token}`
        }
      })
        .then((res) => {
          // console.log(res)
          // console.log('성공')
          context.commit('SAVE_PROFILE', res.data)
        })
        .catch((error) => {
          console.log(error)
          // console.log(context.state.selectedPreference)
        })
    },
    getUserPreferGenre(context) {
      axios({
        method: 'get',
        url: `${DJANGO_URL}/movies/userprefergenre/`,
      })
        .then((res) => {
          context.commit('GET_USER_PREFER_GENRE', res.data)
        })
    },
    saveUserPreferGenre(context, genres) {
      for (let genre in genres) {
        axios({
          method: 'post',
          url: `${DJANGO_URL}/movies/${genres[genre].id}/userprefergenre/`,
          headers: {
            Authorization: `Token ${context.state.Token}`
          },
        })
          .then((res) => {
            // console.log('성공')
            // console.log(res.data)
            context.commit('SAVE_USER_PREFER_GENRE', res.data)
          })
      }
    },
  }
}

movies/models.py
class UserPreferGenre(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    prefer_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, default=0)
```
- 뜨거워: 데이터베이스의 영화정보를 돌면서 영화에 달린 좋아요 갯수를 세고, 좋아요를 많이 받은 순서대로 추천
```
store/index.js
state{
    HoTMovie: null,
},
mutaions{
      GETHOTMOVIE(state) {
      let sortedMovie = _.chain(state.popularMovie).sortBy('movielike_count').reverse()
      let cnt = 0
      const arr = []
      for (let movie of sortedMovie) {
        if (cnt >= 20) {
          break
        } else {
          arr.push(movie)
          cnt++
        }
      }
      state.HoTMovie = arr
    },
}


movies/models.py
class MovieLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    movieLike = models.ForeignKey(Movie, on_delete=models.CASCADE, default=0)


movies/serializers.py
# 영화 좋아요
class MovieLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieLike
        fields = '__all__'
```
## 5. 서비스 대표 기능에 대한 설명
### *너는 내 취향 저격*
- 사용자의 MBTI와 선호하는 장르 정보를 받아 사용자의 취향을 저격한다.
---
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
      ```

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
7. user
---
## 2022/11/17
1. 댓글 views.py , serializer 수정
- 오류1 : 댓글 수정 된 결과는 나왔으나, 전체 조회하면 저장이 되지 않음
- 해결 : comment = Review.objects.get(pk=comment_pk) 리뷰에서 가져오느라 코멘트에 리뷰 정보가 없었다. 리뷰가 아니라 코멘트에서 가져오는 걸로 수정.
```

@api_view(['GET','PUT','DELETE',])
def comment_detail(request,comment_pk):

# comment = Review.objects.get(pk=comment_pk) 리뷰에서 가져오느라 코멘트에 리뷰 정보가 없었다.

    comment = Comment.objects.get(pk=comment_pk)
    if request.method == 'GET':
        serializer = CommentDetailSerializer(comment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CommentDetailSerializer(instance=comment,data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        comment.delete()
        return Response('{성공}',status=status.HTTP_204_NO_CONTENT)

```
- 오류2 : 리뷰와 댓글 작성에 작성자가 안뜸
- 해결: blank=True, null=True 를 넣으니 해결
```

user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)

```
2. vue 메인메뉴 작성
- navbar 영화 리스트 : TMDB API 이용, 인기영화, 명작, 개봉예정, 상영중영화 리스트 뽑아오기
  - 홈화면: 인기영화 20개 보여줌
  - 장르별 영화 리스트 구현
  - 명작: 60개 영화
  - 현재 상영작: 날짜 순으로 정렬
  - 개봉예정작 : 개봉일 빠른 순으로 정렬 
  - lodash 설치, import
```

getUpCommingMovie(context) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming',
        params: {
          api_key: API_KEY,
          language: LANGUAGE,
          page: '1',
          region: REGION
        }
      })
        .then((res) => {
          // console.log(res)
          // console.log(context)
          // 개봉일 기준으로 
          const sortedData = _.sortBy(res.data.results,'release_date')
          context.commit('GET_UP_COMMING_MOVIE',sortedData)
        })
    }

```
3. 인증 관련 기능 완성
4. dj-auth-rest에서 제공한 유저 정보를 사용해 유저 프로필을 구성하였다.
    라우터를 활용한 movie detail을 구현하였다.
5. 데이터베이스에서 영화 상세 정보를 불러옴
6. 영화 상세 정보에서 영화에 달린 리뷰와 리뷰에 달린 댓글 불러옴
7. 리뷰 작성 폼만들고 저장
8. 리뷰 삭제 및 수정
    - 삭제 : 리뷰의 id를 받아 Django 서버의 주소로 axios 요청을 보낸 후 데이터베이스에서 삭제하였다.
    - 수정 : 삭제와 같이 리뷰의 id를 받아 Django 서버 주소로 axios 요청을 보낸 뒤 변경된 내용을 데이터베이스에 저장하였다.
    - 두 개를 구현하는 과정에서 원래 데이터가 실시간으로 변하지 않았는데 이것을 vuex의 state 값을 바꿔주면서 실시간으로 변하도록 하였다.
---
## 2022/11/18
1. 댓글 작성, 삭제
- 댓글을 작성하고 삭제하는 요청을 axios로 보낸다.
- 새로고침을 하지 않아도 작성, 삭제가 되도록 mutations에서 작성해줌
```

  // 댓글 작성
    ADD_COMMENT(state, comment) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((review) => {
        if(review.id === comment.review) {
          review.comment_set.push(comment)
        }
        return review
      })
    },

  // 댓글 삭제
    DELETE_COMMENT(state, payload) {
      state.detailMovie.review_set = state.detailMovie.review_set.map((review) => {
        if (review.id === payload[0]) {
          review.comment_set = review.comment_set.filter((comment) => {
            return !(comment.id === payload[1])
          })
        }
        return review
      })
    }

```
- 댓글 작성자만 댓글을 삭제 할 수 있도록 한다.
2. 댓글 수정
3. 각 영화마다 디테일을 보면 상세정보와 리뷰, 댓글 기능이 보이도록 구현
4. 영화 좋아요 기능 구현
5. 리뷰 좋아요 기능 구현
---
## 2022/11/19
1. 리뷰 좋아요 순으로 정렬해서 보여주기
   - 리뷰들의 리스트를 좋아요를 많이 받은 순으로 위쪽에 보일 수 있게 구현했습니다.
   - ```
     let a = _.chain(state.detailMovie.review_set).sortBy('reviewlike_count').reverse()
           state.detailMovie.review_set = [...a]
     ```
   - 좋아요를 누르고 새로고침을 통해 다시 리뷰 페이지로 오면 좋아요 순으로 정렬되어 보여준다.
2. 검색 기능 추가
   - 네비게이션바에 검색 기능을 추가하여 제목을 입력할 때마다 영화가 보이도록 하였다.
   - ```
     SEARCH_ING(state, titleName) {
           const arr = []
           for (let movie of state.popularMovie) {
             for (let word of movie.title) {
               if (word === titleName || titleName===movie.title || movie.title.includes(titleName)) {
                 arr.push(movie)
                 break
               }
             }
           }
           state.searchingMovie = arr
     ```
     - 조건문을 활용하여 검색을 실시하였다.
---
## 2022/11/21
1. vabvar 수정
2. 장르별로 인기순, 이름순, 리뷰 많은 순으로 정렬 할 수 있게 구현
3. 유저의 취향대로 추천해 주기 위해 유저가 좋아하는 장르를 선택하게 하고 저장. 미완성.
4. 영화 좋아요 많이 받은 순으로 알고리즘 추천
5. 유저 프로필 작성중...
---
## 2022/11/22
1. 프로필 페이지 완성(mbti, 취향)
2. 홈, 검색, 상세정보, 계정 디자인 수정
---
## 2022/11/23
mbti 추천알고리즘 구현,
취향 추천 알고리즘 구현,
프로필 페이지 수정
```
