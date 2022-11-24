<template>
  <!-- 좋아하는 장르 선택 -->
  <div>
    <h1>선택</h1>
    <hr />
    <span>
      <!-- 선택 된 장르 -->
      <SelectedPreference
        v-for="genre in selectedPreference"
        :key="genre.id"
        :genre="genre"
      />
    </span>
    <br />
    <hr />
    <!-- 선택 안 된 장르  -->
    <PreferenceButton
      v-for="genre in preferenceGenre"
      :key="genre.id"
      :genre="genre"
    />
    <br />
    <br />
    <br />
    <br />
    <button>저장하기</button>
  </div>
</template>

<script>
import PreferenceButton from "@/components/PreferenceButton";
import SelectedPreference from "@/components/SelectedPreference";

export default {
  name: "SignUpPreferenceView",
  components: {
    PreferenceButton,
    SelectedPreference,
  },
  methods: {},
  computed: {
    preferenceGenre() {
      return this.$store.state.preferenceGenre;
    },
    selectedPreference() {
      return this.$store.state.selectedPreference;
    },
  },
};
</script>

<style>
</style>