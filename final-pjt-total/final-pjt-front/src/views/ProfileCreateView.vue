<template>
    <div class="text-center">
        <div class="form-signin w-100 m-auto">
              
        <h1>프로필 작성 페이지</h1>

        <label for="nickname">닉네임 : </label>
        <input type="text" id="nickname" v-model="nickname"><br>

        <!-- MBTI -->
        <label for="mbti">MBTI(선택 사항) : </label>
        <!-- <input type="text" id="mbti" v-model="mbti"><br> -->
        <span>
            <form class="d-flex justify-content-center" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-bs-toggle="modal" data-bs-target="#MBTIModal" style="width:200px;">
            </form>
    
                <!-- Modal -->
            <div class="modal fade" id="MBTIModal" tabindex="-1" aria-labelledby="MBTIModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="MBTIModalLabel" style="color: black;">
                            MBTI
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        

                    <div id="mbti">
                        <div class="container">


                        <section class="buttonArea">

                            <div class="buttonRow">
                            <div class="btn" @click="mbti1" :class="{selected:isSelectedE}" id="mbti_btn">
                                <span class="type" value="E">E</span>
                                <span>외향형</span>
                            </div>

                            <div class="btn" @click="mbti1" :class="{selected:isSelectedI}" id="mbti_btn">
                                <span class="type" value="I">I</span>
                                <span>내향형</span>
                            </div>
                            </div>


                            <div class="buttonRow">
                            <div class="btn" @click="mbti2" :class="{selected:isSelectedS}" id="mbti_btn"> 
                                <span class="type" value="S">S</span>
                                <span>감각형</span>
                            </div>
                            <div class="btn" @click="mbti2" :class="{selected:isSelectedN}" id="mbti_btn">
                                <span class="type" value="N">N</span>
                                <span>직관형</span>
                            </div>
                            </div>


                            <div class="buttonRow">
                            <div class="btn" @click="mbti3" :class="{selected:isSelectedT}" id="mbti_btn">
                                <span class="type" value="T">T</span>
                                <span>사고형</span>
                            </div>
                            <div class="btn" @click="mbti3" :class="{selected:isSelectedF}" id="mbti_btn">
                                <span class="type" value="F">F</span>
                                <span>감정형</span>
                            </div>
                            </div>


                            <div class="buttonRow">
                            <div class="btn" @click="mbti4" :class="{selected:isSelectedJ}" id="mbti_btn">
                                <span class="type" value="J">J</span>
                                <span>판단형</span>
                            </div>
                            <div class="btn" @click="mbti4" :class="{selected:isSelectedP}" id="mbti_btn">
                                <span class="type" value="P">P</span>
                                <span>인식형</span>
                            </div>
                            </div>

                        </section>
                        </div>
                    </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="selectMBTIExit">Close</button>
                        <button type="button" onclick="alert('저장이 완료되었습니다!');" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div><br>
        </span>






         <!-- genre -->
        <label for="mbti">선호하는 장르 : </label>
        <span>
            <form class="d-flex justify-content-center" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" data-bs-toggle="modal" data-bs-target="#genreModal" style="width:200px;">
            </form>
    
                <!-- Modal -->
            <div class="modal fade" id="genreModal" tabindex="-1" aria-labelledby="genreModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="genreModalLabel" style="color: black;">
                            선택된 장르
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <span>
                            <SelectedPreference
                                v-for="genre in selectedPreference" :key="genre.id"
                                :genre="genre"
                            />
                        </span>
                        <br>
                        <hr>
                        <PreferenceButton
                            v-for="genre in preferenceGenre" :key="genre.id"
                            :genre="genre"
                        />

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="selectGenreExit">Close</button>
                        <button type="button" onclick="alert('저장이 완료되었습니다!');" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div><br>
        </span>

        <button class="btn btn-lg btn-primary" @click="saveProfile">프로필 저장하기</button>

    </div>
  </div>
</template>

<script>
import PreferenceButton from '@/components/PreferenceButton'
import SelectedPreference from '@/components/SelectedPreference'

export default {
    name: 'ProfileCreateView',
    data() {
        return {
            nickname: null,

            firstMbti:null,
            secondMbti:null,
            thirdMbti:null,
            forthMbti:null,

            isSelectedE:false,
            isSelectedI:false,
            isSelectedS:false,
            isSelectedN:false,
            isSelectedT:false,
            isSelectedF:false,
            isSelectedJ:false,
            isSelectedP:false,
        }
    },
    methods: {
        selectGenreExit() {
            if (!confirm('저장하지 않고 나가겠습니까?\n취소를 누르면 저장하고 나갑니다.')) {
                return
            } else {
                this.$store.commit('SELECT_GENRE_EXIT')
            }
        },
        saveProfile() {
            const nickname = this.nickname
            const mbti = this.firstMbti + this.secondMbti + this.thirdMbti + this.forthMbti
            const prefer_genre = this.$store.state.selectedPreference
            const perferGenre = []
            // console.log(prefer_genre)
            for (let i=1; i<=prefer_genre.length;i++) {
                perferGenre[i-1] = {
                    id: prefer_genre[i-1].id,
                    name: prefer_genre[i-1].name
                }
            }
            const data = JSON.stringify(perferGenre)
            const payload = {
                nickname,
                mbti,
                perfer_genre:data,

            }
            // console.log(perferGenre[0].id)
            this.$store.dispatch('saveProfile',payload)
            this.isSelectedE = this.isSelectedI = this.isSelectedS = this.isSelectedN = this.isSelectedT = this.isSelectedF = this.isSelectedJ = this.isSelectedP = false
            this.firstMbti = this.secondMbti = this.thirdMbti = this.forthMbti = null

            this.$router.push({ name : 'profile', params: { user_id : this.$store.state.userInfo.pk }})
        },
        mbti1(event) {
          let check = event.target.innerText[0]
          if (check === 'E') {
            this.isSelectedE = true
            this.isSelectedI = !this.isSelectedE
          } else {
            this.isSelectedI = true
            this.isSelectedE = !this.isSelectedI
          }
          if (check === '외') {
            check = 'E'
          } else if (check === '내') {
            check = 'I'
          }
          this.firstMbti = check
        },
        mbti2(event) {
          let check = event.target.innerText[0]
          if (check === 'S') {
            this.isSelectedS = true
            this.isSelectedN = !this.isSelectedS
          } else {
            this.isSelectedN = true
            this.isSelectedS = !this.isSelectedN
          }
          if (check === '감') {
            check = 'S'
          } else if (check === '직') {
            check = 'N'
          }
          this.secondMbti = check
        },
        mbti3(event) {
          let check = event.target.innerText[0]
          if (check === 'T') {
            this.isSelectedT = true
            this.isSelectedF = !this.isSelectedT
          } else {
            this.isSelectedF = true
            this.isSelectedT = !this.isSelectedF
          }
          if (check === '사') {
            check = 'T'
          } else if (check === '감') {
            check = 'F'
          }
          this.thirdMbti = check
        },
        mbti4(event) {
          let check = event.target.innerText[0]
          if (check === 'J') {
            this.isSelectedJ = true
            this.isSelectedP = !this.isSelectedJ
          } else {
            this.isSelectedP = true
            this.isSelectedJ = !this.isSelectedP
          }
          if (check === '판') {
            check = 'J'
          } else if (check === '인') {
            check = 'P'
          }
          this.forthMbti = check
        },
        selectMBTIExit() {
            if (!confirm('저장하지 않고 나가겠습니까?\n취소를 누르면 저장하고 나갑니다.')) {
                return
            } else {
                this.isSelectedE = this.isSelectedI = this.isSelectedS = this.isSelectedN = this.isSelectedT = this.isSelectedF = this.isSelectedJ = this.isSelectedP = false
                this.firstMbti = this.secondMbti = this.thirdMbti = this.forthMbti = null
            }
        },
        getPreferenceGenre() {
            this.$store.commit('GET_PREFERENCE_GENRE')
        }
    },
    components: {
      PreferenceButton,
      SelectedPreference
    },
    computed: {
        preferenceGenre() {
            return this.$store.state.preferenceGenre
        },
        selectedPreference() {
            return this.$store.state.selectedPreference
        },
    },
    created() {
        this.getPreferenceGenre()
    }
}
</script>

<style>
/* MBTI */

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 500px;
      margin: 0 auto;
    }

    .buttonArea {
      margin: 0 auto;
      width: 80%;
    }

    .buttonRow {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      height: 80px;
    }

    #mbti_btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 45%;
      border: 1px solid #50B8E7;
      cursor: pointer;
    }

    .result {
      margin-top: 10px;
      outline: none;
      background: none;
      border: 1px solid #50B8E7;
      width: 100px;
      height: 50px;
      cursor: pointer;
      font-size: large;
    }

    .result:hover {
      background-color: #B9E2F5;
    }

    #mbti_btn:hover {
        background-color: #50B8E7;
    }

    .type {
      font-size: x-large;
      font-weight: bold;
    }

    .selected {
      background-color: #50B8E7;
    }



</style>