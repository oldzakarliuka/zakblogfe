<template>
  <div class="wrapper">
    <article class="article" v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.user_name }} ({{ post.user_login }})</p>
      <small>{{ normalizeDate(post.created_at) }}</small>
      <div class="article__thumb" v-if="post.thumb">
        <img :src="post.thumb" :alt="post.title" class="response-img" />
      </div>
      <div v-html="post.content"></div>
    </article>
    <spinnerVue v-else />
  </div>
</template>
<script>
import { loadPost } from "../service/api.service";
import spinnerVue from "./spinner.vue";

export default {
  name: "home-post",
  components: { spinnerVue },
  data() {
    return {
      post: null,
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.post = await loadPost(id);
  },
  methods: {
    normalizeDate(date) {
      return new Date(date).toLocaleString();
    },
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
.wrapper {
  display: flex;
  min-height: calc(100vh - 62px);
}
</style>
