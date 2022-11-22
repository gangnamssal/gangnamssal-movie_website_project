<template>
    <div class="text-center">
        <div class="form-signin w-100 m-auto">
              
        <h1>프로필 작성 페이지</h1>

        <label for="nickname">닉네임 : </label>
        <input type="text" id="nickname" v-model="nickname"><br>

        <label for="mbti">MBTI : </label>
        <input type="text" id="mbti" v-model="mbti"><br>

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
            mbti: null,
        }
    },
    methods: {
        selectGenreExit() {
            if (!confirm('저장하지 않고 나가겠습니까?')) {
                return
            } else {
                this.$store.commit('SELECT_GENRE_EXIT')
            }
        },
        saveProfile() {
            const nickname = this.nickname
            const mbti = this.mbti
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
            this.$router.push({ name : 'profile' })
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
    }
}
</script>

<style>

</style>