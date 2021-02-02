<template>
  <article class="article">
    <h1>{{ this.getSelectedPost.title }}</h1>
    <p>
      {{ this.getSelectedPost.user_name }} ({{
        this.getSelectedPost.user_login
      }})
    </p>
    <div class="article__thumb" v-if="this.getSelectedPost.thumb">
      <img
        :src="this.getSelectedPost.thumb"
        :alt="this.getSelectedPost.title"
        class="response-img "
      />
    </div>
    <div v-html="this.getSelectedPost.content"></div>
  </article>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "home-post",
  computed: {
    ...mapGetters(["getSelectedPost"]),
  },
};
</script>
<style lang="scss">
.article {
  padding: 0 10px;
}
.article__thumb {
  height: 400px;
}
.response-img {
  height: 100%;
}
</style>
