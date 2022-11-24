<template>
  <!-- <div id="profile">
    <div class="container">
      <div  class="row row-cols-2">
        <div id="profileText" class="col">
          <h1>프로필</h1>
          <button @click="goToUpdateProfile">수정하러 가기</button>
          <p>닉네임 : {{ profile?.nickname }}</p>
          <p>mbti : {{ profile?.mbti }}</p>
          <p>선호 장르 : </p>
          <span v-for="genre in userPreferGenre" :key="genre.id">
            {{ genre }}
          </span>
        </div>

        <div id="profiledata" class="col">
          <p>내가 좋아한 영화 : </p>
          <span v-for="movie in favoriteMovie" :key="movie.id">{{ movie.title }} <br></span>
          <hr>
          <p>내가 쓴 리뷰 : </p>
          <span v-for="review in myReviewList" :key="review.id">{{ review.title }}</span>
        </div>
      </div>
      </div>
  </div> -->

<div>
  <header>

	<div class="profile-container">

		<div class="profile">

			<div class="profile-image">

				<img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="">

			</div>

			<div class="profile-user-settings">

				<h1 class="profile-user-name" style="color:#B87C4C;">{{ profile?.nickname }}</h1>

				<button class="btn profile-edit-btn" @click="goToUpdateProfile" style="margin-bottom:15px;">프로필 수정하기</button>

				<!-- <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i></button> -->

			</div>

			<div class="profile-stats">
				<ul style="padding:0px">
					<li><span class="profile-stat-count" style="color:red;">{{ $store.state.userInfo.review_set.length }}</span> <span style="color:gray;">|</span> 내 리뷰</li>
					<li><span class="profile-stat-count" style="color:red;">{{ $store.state.userInfo.movielike_set.length }}</span> <span style="color:gray;">|</span> 내가 좋아한 영화</li>
					<li><span class="profile-stat-count" style="color:red;">{{ $store.state.userInfo.reviewlike_set.length }}</span> <span style="color:gray;">|</span> 내가 좋아한 리뷰</li>
				</ul>

			</div>

			<div class="profile-bio">

				<!-- <p><span class="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p> -->
        <p><span v-for="genre in userPreferGenre" :key="genre.id" @click="goToprofileGenre" style="cursor: pointer;">{{ genre }} <span style="color:gray;">/</span></span></p>

			</div>

		</div>
		<!-- End of profile section -->

	</div>
	<!-- End of container -->

</header>

<main>

	<div class="profile-container">

		<div class="gallery">
			<div class="gallery-item" tabindex="0"  v-for="movie in favoriteMovie" :key="movie.id"  @click="getDetail(movie?.id)">
				<img :src="`https://www.themoviedb.org/t/p/original/${movie.poster_path}`" class="gallery-image" :alt="movie.title">
				<div class="gallery-item-info">
					<ul>
						<li class="gallery-item-likes"><span>좋아요: </span>{{ movie.movielike_count }}</li><br>
						<li class="gallery-item-comments"><span>리뷰: </span>{{ movie.review_set.length }}</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- End of gallery -->

	</div>
	<!-- End of container -->

</main>
</div>


</template>

<script>
export default {
    name: 'ProfileView',
    data() {
      return {
        favoriteMovie: null,
        myReviewList: null,
      }
    },
    methods: {
      goToWrite() {
        this.$router.push({ name : 'ProfileCreateView' })
      },
      getProfile() {
        this.$store.dispatch('getProfileDetail')
      },
      getPreferGenre() {
        this.$store.commit('GET_PREFER_GENRE')
      },
      myFavoriteMovie() {
        const findMovie = []
        for (let movie of this.$store.state.userInfo.movielike_set) {
          findMovie.push(this.$store.state.popularMovie.find((movies) => {
            return movie.movieLike === movies.id
          }))
        }
        this.favoriteMovie = findMovie
      },
      getReviewList() {
        this.myReviewList = this.$store.state.userInfo.review_set
      },
      goToUpdateProfile() {
        this.$router.push({ name : 'ProfileUpdateView'})
      },
      refreshAll() {
        if (self.name != 'reload') {
         self.name = 'reload';
         self.location.reload(true);
          }
          else self.name = ''; 
      },
      getDetail(movie_id) {
        this.$router.push({ name: 'detail', params: { movie_id } })
      },
      goToprofileGenre() {
        this.$router.push({ name : 'genre' })
      }
    },
    computed: {
      profile() {
        return this.$store.state.userProfile
      },
      userPreferGenre() {
        return this.$store.state.userPreferGenre
      },
    },
    created() { 
      this.refreshAll()
      this.getProfile()
      this.getPreferGenre()
      this.myFavoriteMovie()
      this.getReviewList()
    },
}
</script>

<style scoped>
:root {
    font-size: 15px;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}


img {
    display: block;
}

.profile-container {
    max-width: 93.5rem;
    margin: 0 auto;
    padding: 0 2rem;
}

.btn {
    display: inline-block;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
}

.btn:focus {
    outline: 0.5rem auto #4d90fe;
}

.visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}

/* Profile Section */

.profile {
    padding: 5rem 0;
}

.profile::after {
    content: "";
    display: block;
    clear: both;
}

.profile-image {
    float: left;
    width: calc(33.333% - 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3rem;
}

.profile-image img {
    border-radius: 50%;
}

.profile-user-settings,
.profile-stats,
.profile-bio {
    float: left;
    width: calc(66.666% - 2rem);
}

.profile-user-settings {
    margin-top: 1.1rem;
}

.profile-user-name {
    display: inline-block;
    font-size: 3.2rem;
    font-weight: 300;
}

.profile-edit-btn {
    font-size: 1.4rem;
    line-height: 1.8;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.3rem;
    padding: 0 2.4rem;
    margin-left: 2rem;
}

.profile-settings-btn {
    font-size: 2rem;
    margin-left: 1rem;
}

.profile-stats {
    margin-top: 2.3rem;
}

.profile-stats li {
    display: inline-block;
    font-size: 1.6rem;
    line-height: 1.5;
    margin-right: 4rem;
    cursor: pointer;
}

.profile-stats li:last-of-type {
    margin-right: 0;
}

.profile-bio {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 2.3rem;
}

.profile-real-name,
.profile-stat-count,
.profile-edit-btn {
    font-weight: 600;
}

/* Gallery Section */

.gallery {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem -1rem;
    padding-bottom: 3rem;
}

.gallery-item {
    position: relative;
    flex: 1 0 22rem;
    margin: 1rem;
    color: #fff;
    cursor: pointer;
}

.gallery-item:hover .gallery-item-info,
.gallery-item:focus .gallery-item-info {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.gallery-item-info {
    display: none;
}

.gallery-item-info li {
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 600;
}

.gallery-item-likes {
    margin-right: 2.2rem;
}

.gallery-item-type {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
    text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
}

.fa-clone,
.fa-comment {
    transform: rotateY(180deg);
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


/* Media Query */

@media screen and (max-width: 40rem) {
    .profile {
        display: flex;
        flex-wrap: wrap;
        padding: 4rem 0;
    }

    .profile::after {
        display: none;
    }

    .profile-image,
    .profile-user-settings,
    .profile-bio,
    .profile-stats {
        float: none;
        width: auto;
    }

    .profile-image img {
        width: 7.7rem;
    }

    .profile-user-settings {
        flex-basis: calc(100% - 10.7rem);
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .profile-user-name {
        font-size: 2.2rem;
    }

    .profile-edit-btn {
        order: 1;
        padding: 0;
        text-align: center;
        margin-top: 1rem;
    }

    .profile-edit-btn {
        margin-left: 0;
    }

    .profile-bio {
        font-size: 1.4rem;
        margin-top: 1.5rem;
    }

    .profile-edit-btn,
    .profile-bio,
    .profile-stats {
        flex-basis: 100%;
    }

    .profile-stats {
        order: 1;
        margin-top: 1.5rem;
    }

    .profile-stats ul {
        display: flex;
        text-align: center;
        padding: 1.2rem 0;
        border-top: 0.1rem solid #dadada;
        border-bottom: 0.1rem solid #dadada;
    }

    .profile-stats li {
        font-size: 1.4rem;
        flex: 1;
        margin: 0;
    }

    .profile-stat-count {
        display: block;
    }
}

/* Spinner Animation */

@keyframes loader {
    to {
        transform: rotate(360deg);
    }
}

/*

The following code will only run if your browser supports CSS grid.

Remove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. 

*/

@supports (display: grid) {
    .profile {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: repeat(3, auto);
        grid-column-gap: 3rem;
        align-items: center;
    }

    .profile-image {
        grid-row: 1 / -1;
    }

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        grid-gap: 2rem;
    }

    .profile-image,
    .profile-user-settings,
    .profile-stats,
    .profile-bio,
    .gallery-item,
    .gallery {
        width: auto;
        margin: 0;
    }

    @media (max-width: 40rem) {
        .profile {
            grid-template-columns: auto 1fr;
            grid-row-gap: 1.5rem;
        }

        .profile-image {
            grid-row: 1 / 2;
        }

        .profile-user-settings {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 1rem;
        }

        .profile-edit-btn,
        .profile-stats,
        .profile-bio {
            grid-column: 1 / -1;
        }

        .profile-user-settings,
        .profile-edit-btn,
        .profile-settings-btn,
        .profile-bio,
        .profile-stats {
            margin: 0;
        }
    }
}
</style>