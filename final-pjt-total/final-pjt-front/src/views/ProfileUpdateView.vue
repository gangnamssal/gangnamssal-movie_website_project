<template>
  <div class="create-profile text-center">
    <div class="form-signin w-100 m-auto">
      <h1>프로필 수정</h1>
      <label for="nickname">별명 : </label>
      <input type="text" id="nickname" v-model="nickname" class="m-3" /><br />
      <!-- MBTI -->
      <!-- <input type="text" id="mbti" v-model="mbti"><br> -->
      <span>
        <form class="d-flex justify-content-center" role="search">
          <label for="mbti" class="m-3">엠비티아이 : </label>
          <input
            class="form-control me-2"
            type="search"
            :placeholder="$store.state.userProfile.mbti"
            aria-label="Search"
            data-bs-toggle="modal"
            data-bs-target="#MBTIModal"
            style="width: 200px"
            v-model="MBTI"
            id="mbti"
          />
        </form>
        <!-- Modal -->
        <div
          class="modal fade"
          id="MBTIModal"
          tabindex="-1"
          aria-labelledby="MBTIModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1
                  class="modal-title fs-5"
                  id="MBTIModalLabel"
                  style="color: black"
                >
                엠비티아이
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="selectMBTIExit"
                ></button>
              </div>
              <div class="modal-body">
                <div id="mbti">
                  <div class="container">
                    <section class="buttonArea">
                      <div class="buttonRow">
                        <div
                          class="btn"
                          @click="mbti1"
                          :class="{ selected: isSelectedE }"
                          id="mbti_btn"
                        >
                          <span class="type" value="E">E</span>
                          <span>외향형</span>
                        </div>
                        <div
                          class="btn"
                          @click="mbti1"
                          :class="{ selected: isSelectedI }"
                          id="mbti_btn"
                        >
                          <span class="type" value="I">I</span>
                          <span>내향형</span>
                        </div>
                      </div>
                      <div class="buttonRow">
                        <div
                          class="btn"
                          @click="mbti2"
                          :class="{ selected: isSelectedS }"
                          id="mbti_btn"
                        >
                          <span class="type" value="S">S</span>
                          <span>감각형</span>
                        </div>
                        <div
                          class="btn"
                          @click="mbti2"
                          :class="{ selected: isSelectedN }"
                          id="mbti_btn"
                        >
                          <span class="type" value="N">N</span>
                          <span>직관형</span>
                        </div>
                      </div>
                      <div class="buttonRow">
                        <div
                          class="btn"
                          @click="mbti3"
                          :class="{ selected: isSelectedT }"
                          id="mbti_btn"
                        >
                          <span class="type" value="T">T</span>
                          <span>사고형</span>
                        </div>
                        <div
                          class="btn"
                          @click="mbti3"
                          :class="{ selected: isSelectedF }"
                          id="mbti_btn"
                        >
                          <span class="type" value="F">F</span>
                          <span>감정형</span>
                        </div>
                      </div>
                      <div class="buttonRow">
                        <div
                          class="btn"
                          @click="mbti4"
                          :class="{ selected: isSelectedJ }"
                          id="mbti_btn"
                        >
                          <span class="type" value="J">J</span>
                          <span>판단형</span>
                        </div>
                        <div
                          class="btn"
                          @click="mbti4"
                          :class="{ selected: isSelectedP }"
                          id="mbti_btn"
                        >
                          <span class="type" value="P">P</span>
                          <span>인식형</span>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <!-- mbti 모달푸터  -->
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="selectMBTIExit"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onclick="alert('저장이 완료되었습니다!');"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                  @click="saveMBTI"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </span>

      <!-- genre -->
      <label for="mbti">선호하는 장르 : </label>
      <span>
        <form class="d-flex justify-content-center" role="search">
          <input
            class="form-control me-2"
            type="search"
            :placeholder="$store.state.userPreferGenre"
            aria-label="Search"
            data-bs-toggle="modal"
            data-bs-target="#genreModal"
            style="width: 1000px"
            v-model="genre"
            id="genre"
          />
        </form>
        <!-- 장르 선택 Modal -->
        <div
          class="modal fade"
          id="genreModal"
          tabindex="-1"
          aria-labelledby="genreModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <!-- 장르 모달 헤더 -->
              <div class="modal-header">
                <h1
                  class="modal-title fs-5"
                  id="genreModalLabel"
                  style="color: black"
                >
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="selectGenreExit"
                ></button>
              </div>
              <!-- 장르 모달 바디 -->
              <div class="modal-body">
                <!-- 선택된 장르 -->
                <p style="color: black">선택함</p>
                <div class="row row-cols-lg-4 g-4 m-5">
                  <SelectedPreference
                    v-for="genre in selectedPreference"
                    :key="genre.id"
                    :genre="genre"
                  />
                </div>
                <!-- 선택 안한 장르 -->
                <p style="color: black">선택안함</p>
                <div class="row row-cols-lg-4 g-4 m-5">
                  <PreferenceButton
                    v-for="genre in preferenceGenre"
                    :key="genre.id"
                    :genre="genre"
                  />
                </div>
              </div>
              <!-- 모달 푸터 : 닫기 or 저장-->
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="selectGenreExit"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onclick="alert('저장이 완료되었습니다!');"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                  @click="saveGenre"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </span>
      <br>
      <!-- <button class="btn btn-lg btn-primary" @click="saveUpdateProfile">프로필 저장하기</button> -->
      <button
        style="--content: '저장하기!'"
        @click="saveUpdateProfile"
        class="profile-save-button"
      >
        <div class="left"></div>
        저장하기!
        <div class="right"></div>
      </button>
    </div>
  </div>
</template>
  
  <script>
import PreferenceButton from "@/components/PreferenceButton";
import SelectedPreference from "@/components/SelectedPreference";

export default {
  name: "ProfileUpdateView",
  data() {
    return {
      nickname: this.$store.state.userProfile.nickname,
      MBTI: null,
      genre: null,
      firstMbti: null,
      secondMbti: null,
      thirdMbti: null,
      forthMbti: null,

      isSelectedE: false,
      isSelectedI: false,
      isSelectedS: false,
      isSelectedN: false,
      isSelectedT: false,
      isSelectedF: false,
      isSelectedJ: false,
      isSelectedP: false,
    };
  },
  methods: {
    selectGenreExit() {
      if (
        !confirm(
          "저장하지 않고 나가겠습니까?\n취소를 누르면 저장하고 나갑니다."
        )
      ) {
        return;
      } else {
        this.$store.commit("SELECT_GENRE_EXIT");
      }
    },
    saveUpdateProfile() {
      const nickname = this.nickname;
      const mbti =
        this.firstMbti + this.secondMbti + this.thirdMbti + this.forthMbti;
      const prefer_genre = this.$store.state.selectedPreference;
      const payload = {
        nickname,
        mbti,
        id: this.$store.state.userInfo.id,
      };
      this.$store.dispatch("deleteUserPreferGenre");
      this.$store.dispatch("saveUpdateProfile", payload);
      this.$store.dispatch("saveUserPreferGenre", prefer_genre);

      this.isSelectedE =
        this.isSelectedI =
        this.isSelectedS =
        this.isSelectedN =
        this.isSelectedT =
        this.isSelectedF =
        this.isSelectedJ =
        this.isSelectedP =
          false;
      this.firstMbti = this.secondMbti = this.thirdMbti = this.forthMbti = null;

      this.$router.push({
        name: "profile",
        params: { user_id: this.$store.state.userInfo.id },
      });
    },
    saveMBTI() {
      this.MBTI =
        this.firstMbti + this.secondMbti + this.thirdMbti + this.forthMbti;
      const inputTag = document.querySelector("#mbti");
      inputTag.setAttribute("readonly", "true");
    },
    saveGenre() {
      this.genre = this.selectedGenreName;
      const inputTag = document.querySelector("#genre");
      inputTag.setAttribute("readonly", "true");
    },
    mbti1(event) {
      let check = event.target.innerText[0];
      if (check === "E") {
        this.isSelectedE = true;
        this.isSelectedI = !this.isSelectedE;
      } else {
        this.isSelectedI = true;
        this.isSelectedE = !this.isSelectedI;
      }
      if (check === "외") {
        check = "E";
      } else if (check === "내") {
        check = "I";
      }
      this.firstMbti = check;
    },
    mbti2(event) {
      let check = event.target.innerText[0];
      if (check === "S") {
        this.isSelectedS = true;
        this.isSelectedN = !this.isSelectedS;
      } else {
        this.isSelectedN = true;
        this.isSelectedS = !this.isSelectedN;
      }
      if (check === "감") {
        check = "S";
      } else if (check === "직") {
        check = "N";
      }
      this.secondMbti = check;
    },
    mbti3(event) {
      let check = event.target.innerText[0];
      if (check === "T") {
        this.isSelectedT = true;
        this.isSelectedF = !this.isSelectedT;
      } else {
        this.isSelectedF = true;
        this.isSelectedT = !this.isSelectedF;
      }
      if (check === "사") {
        check = "T";
      } else if (check === "감") {
        check = "F";
      }
      this.thirdMbti = check;
    },
    mbti4(event) {
      let check = event.target.innerText[0];
      if (check === "J") {
        this.isSelectedJ = true;
        this.isSelectedP = !this.isSelectedJ;
      } else {
        this.isSelectedP = true;
        this.isSelectedJ = !this.isSelectedP;
      }
      if (check === "판") {
        check = "J";
      } else if (check === "인") {
        check = "P";
      }
      this.forthMbti = check;
    },
    selectMBTIExit() {
      if (
        !confirm(
          "저장하지 않고 나가겠습니까?\n취소를 누르면 저장하고 나갑니다."
        )
      ) {
        return;
      } else {
        this.isSelectedE =
          this.isSelectedI =
          this.isSelectedS =
          this.isSelectedN =
          this.isSelectedT =
          this.isSelectedF =
          this.isSelectedJ =
          this.isSelectedP =
            false;
        this.firstMbti =
          this.secondMbti =
          this.thirdMbti =
          this.forthMbti =
            null;
      }
    },
    getPreferenceGenre() {
      this.$store.commit("GET_PREFERENCE_GENRE");
    },
  },
  components: {
    PreferenceButton,
    SelectedPreference,
  },
  computed: {
    preferenceGenre() {
      return this.$store.state.preferenceGenre;
    },
    selectedPreference() {
      return this.$store.state.selectedPreference;
    },
    selectedGenreName() {
      const data = [];
      this.selectedPreference.forEach((genre) => {
        data.push(genre.name);
      });
      return data;
    },
  },
  created() {
    this.getPreferenceGenre();
  },
};
</script>
  
  <style>
/* MBTI */
.create-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
}
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
  border: 1px solid #50b8e7;
  cursor: pointer;
}

.result {
  margin-top: 10px;
  outline: none;
  background: none;
  border: 1px solid #50b8e7;
  width: 100px;
  height: 50px;
  cursor: pointer;
  font-size: large;
}

.result:hover {
  background-color: #b9e2f5;
}

#mbti_btn:hover {
  background-color: #50b8e7;
}

.type {
  font-size: x-large;
  font-weight: bold;
}

.selected {
  background-color: #50b8e7;
}

@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:200,900");

:root {
  --text-color: hsla(210, 50%, 85%, 1);
  --shadow-color: hsla(210, 40%, 52%, 0.4);
  --btn-color: hsl(210, 80%, 42%);
  --bg-color: #141218;
}

* {
  box-sizing: border-box;
}

.profile-save-button {
  position: relative;
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;

  font-family: "Source Code Pro";
  font-weight: 900;
  text-transform: uppercase;
  font-size: 30px;
  color: var(--text-color);

  background-color: var(--btn-color);
  box-shadow: var(--shadow-color) 2px 2px 22px;
  border-radius: 4px;
  z-index: 0;
  overflow: hidden;
}

.profile-save-button:focus {
  outline-color: transparent;
  box-shadow: var(--btn-color) 2px 2px 22px;
}

.right::after,
.profile-save-button::after {
  content: var(--content);
  display: block;
  position: absolute;
  white-space: nowrap;
  padding: 40px 40px;
  pointer-events: none;
}

.profile-save-button::after {
  font-weight: 200;
  top: -30px;
  left: -20px;
}

.right,
.left {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.right {
  left: 66%;
}
.left {
  right: 66%;
}
.right::after {
  top: -30px;
  left: calc(-66% - 20px);

  background-color: var(--bg-color);
  color: transparent;
  transition: transform 0.4s ease-out;
  transform: translate(0, -90%) rotate(0deg);
}

.profile-save-button:hover .right::after {
  transform: translate(0, -47%) rotate(0deg);
}

.profile-save-button .right:hover::after {
  transform: translate(0, -50%) rotate(-7deg);
}

.profile-save-button .left:hover ~ .right::after {
  transform: translate(0, -50%) rotate(7deg);
}

/* bubbles */
.profile-save-button::before {
  content: "";
  pointer-events: none;
  opacity: 0.6;
  background: radial-gradient(
      circle at 20% 35%,
      transparent 0,
      transparent 2px,
      var(--text-color) 3px,
      var(--text-color) 4px,
      transparent 4px
    ),
    radial-gradient(
      circle at 75% 44%,
      transparent 0,
      transparent 2px,
      var(--text-color) 3px,
      var(--text-color) 4px,
      transparent 4px
    ),
    radial-gradient(
      circle at 46% 52%,
      transparent 0,
      transparent 4px,
      var(--text-color) 5px,
      var(--text-color) 6px,
      transparent 6px
    );

  width: 100%;
  height: 300%;
  top: 0;
  left: 0;
  position: absolute;
  animation: bubbles 5s linear infinite both;
}

@keyframes bubbles {
  from {
    transform: translate();
  }
  to {
    transform: translate(0, -66.666%);
  }
}
</style>