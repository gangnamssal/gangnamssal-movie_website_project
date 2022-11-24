<template>
  <div>
    <!-- 리뷰 모달 -->
    <div
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      @click="modal.show()"
    >
      <!-- 리뷰 제목 & 리뷰 좋아요 갯수 -->
      <div class="d-flex justify-content-between px-3">
        {{ review?.title }}
        <div>
          <!-- 하트 아이콘 -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart-fill"
            viewBox="0 0 16 16"
            style="color: red"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
          {{ likedCount }}
        </div>
      </div>
      <hr />
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      ref="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" style="color: black">
          <!-- 모달 헤드 : 리뷰 제목 -->
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              {{ review?.title }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- 모달 바디 -->
          <div class="modal-body">
            <!-- 선택한 리뷰 -->
            <div class="review-list">
              <p>작성자 : {{ review?.username }}</p>
              <p style="font-weight: bold; font-size: large">
                {{ review?.title }}
              </p>
              <p>{{ review?.content }}</p>
              <p>평점 : {{ review?.rank }}</p>
              <p>작성 시간 : {{ review?.created_at }}</p>
              <p>수정 시간 : {{ review?.updated_at }}</p>
            </div>
            <!-- 리뷰 삭제 버튼 -->
            <button
              type="button"
              class="btn btn-dark form-button"
              data-bs-dismiss="modal"
              @click="deleteReview"
              v-if="review.user === userInfo.id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
                />
              </svg>
            </button>
            <!-- 리뷰 수정 버튼 -->
            <button
              type="button"
              class="btn btn-dark form-button"
              @click="updateReview"
              v-if="review.user === userInfo.id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
            </button>
            <!-- 좋아요 버튼 -->
            <button
              class="like"
              @click="likeReview"
              style="color: black"
              v-if="IsLiked === false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
            </button>
            <!-- 좋아요 취소 버튼 -->
            <button
              class="like"
              @click="likeReviewDelete"
              style="color: red"
              v-else-if="IsLiked === true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </button>
            <!-- 리뷰 좋아요 갯수 -->
            {{ likedCount }}

            <!-- 리뷰 수정 -->
            <div v-show="isUpdate">
              <label for="title">제목 </label>
              <input type="text" id="title" v-model="title" />
              <br />
              <label for="content">내용 </label>
              <textarea
                id="content"
                cols="30"
                rows="10"
                v-model="content"
              ></textarea>
              <br />
              <div class="rank">
                <div>
                  <label for="rank">평점 </label>
                  <input
                    type="number"
                    id="rank"
                    min="0"
                    max="10"
                    step="0.5"
                    v-model="rank"
                  />
                </div>
                <!-- 수정 저장 버튼 -->
                <button class="form-button" @click="saveUpdateReview">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <hr />
            <!-- 댓글 작성 -->
            <div class="comment-form">
              <textarea
                id="comment"
                rows="1"
                v-model="comment"
                @keyup.enter="addComment"
                placeholder="댓글쓰기"
              ></textarea>
              <!-- 댓글 작성 버튼 -->
              <button
                type="button"
                class="btn btn-light form-button"
                @click="addComment"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chat-dots-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                  />
                </svg>
              </button>
            </div>
            <!-- 댓글 리스트 -->
            <CommentList
              v-for="comment in review.comment_set"
              :key="comment.id"
              :comment="comment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import CommentList from "@/components/CommentList.vue";

export default {
  name: "ReviewsList",
  data() {
    return {
      isUpdate: false,
      title: this.review.title,
      content: this.review.content,
      rank: this.review.rank,
      comment: null,
      modal: null,
    };
  },
  components: {
    CommentList,
  },
  props: {
    review: Object,
  },
  methods: {
    // 리뷰 삭제
    deleteReview() {
      this.$store.dispatch("deleteReview", this.review.id);
    },
    // 리뷰 수정 폼 열기
    updateReview() {
      this.isUpdate = !this.isUpdate;
    },
    // 수정 리뷰 저장
    saveUpdateReview() {
      const title = this.title;
      const content = this.content;
      const rank = this.rank;
      const movie_title = this.review.movie_title;
      const review_id = this.review.id;
      const payload = {
        title,
        content,
        rank,
        review_id,
        movie_title,
      };
      this.$store.dispatch("saveUpdateReview", payload);
      this.isUpdate = !this.isUpdate;
    },
    // 댓글달기
    addComment() {
      if (this.$store.state.Token === null) {
        alert("로그인을 해주세요!");
      } else {
        const payload = [this.review.id, this.comment];
        this.$store.dispatch("addComment", payload);
        this.comment = null;
      }
    },
    // 리뷰 좋아요 (로그인 사용자만 가능)
    likeReview() {
      if (this.$store.state.Token === null) {
        alert("로그인을 해주세요!");
      } else {
        this.$store.dispatch("likeReview", this.review.id);
        console.log(this.IsLiked);
      }
    },
    // 리뷰 좋아요 취소 (로그인 사용자만 가능)
    likeReviewDelete() {
      if (this.$store.state.Token === null) {
        alert("로그인을 해주세요!");
      } else {
        const reviewLikeId = this.review.reviewlike_set.filter((review) => {
          return review.user === this.$store.state.userInfo.id;
        });
        const payload = [
          this.$store.state.userInfo.id,
          reviewLikeId[0].id,
          reviewLikeId[0].reviewLike,
        ];
        this.$store.dispatch("likeReviewDelete", payload);
        console.log(this.IsLiked);
      }
    },
  },
  computed: {
    // 유저 정보
    userInfo() {
      return this.$store.state.userInfo;
    },
    // 좋아요 여부
    IsLiked() {
      let isLiked = null;
      this.$store.state.detailMovie.review_set.forEach((review) => {
        if (review.id === this.review.id) {
          isLiked = review.reviewlike_set.some((like) => {
            return like.user === this.$store.state.userInfo.id;
          });
        }
      });
      return isLiked;
    },
    // 좋아요 개수
    likedCount() {
      let count = null;
      this.$store.state.detailMovie.review_set.forEach((review) => {
        if (review.id === this.review.id) {
          count = review.reviewlike_set.length;
        }
      });
      return count;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.staticBackdrop);
  },
};
</script>

<style>
#comment {
  width: 90%;
  border-radius: 10px;
  border: 0;
  opacity: 0.5;
  padding: 10px;
}

.comment-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  min-width: 300px;
}

.form-button {
  background: none;
  border: 0;
  color: black;
}
</style>