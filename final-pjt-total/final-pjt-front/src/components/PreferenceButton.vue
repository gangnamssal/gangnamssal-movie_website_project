<template>
  <!-- 선택 안 된 장르 정보 -->
  <div class="col">
    <div class="h-100">
      <div
        style="
          width: 150px;
          height: 180px;
          margin: 2px;
          background-color: black;
          color: white;
        "
        @click="selectedPreferenceGenre"
      >
        <img
          :src="require(`../assets/genre/genre${genre.id}.png`)"
          alt=""
          style="width: 150px; height: 150px; margin-bottom: 5px"
        />
        {{ genre?.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreferenceButton",
  props: {
    genre: Object,
  },
  methods: {
    selectedPreferenceGenre() {
      this.$store.commit("SELECTED_PREFERENCE_GENRE", this.genre);
    },
  },
};
</script>

<style>
</style>