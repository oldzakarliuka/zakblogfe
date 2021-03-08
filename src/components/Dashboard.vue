<template>
  <div class="posts">
    <div
      class="post"
      v-for="{ title, thumb, id } of posts"
      :key="title + id"
      @click="navigateTo(id)"
    >
      <img
        :src="thumb"
        :alt="title"
        v-if="thumb"
        class="response-img post__thumb"
      />
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>
<script>
import { loadPosts } from "../service/api.service";
export default {
  name: "home-dashboard",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    navigateTo(id) {
      this.$router.push({
        path: `/post/${id}`,
      });
    },
  },

  async mounted() {
    try {
      this.posts = await loadPosts();
    } catch (e) {
      console.error(e);
      alert(
        "Ooops! Something went wrong! Please reload the page and try again!"
      );
    }
  },
};
</script>
<style lang="scss" scoped>
.post__thumb {
  height: 200px;
  width: 100%;
  border-radius: 40px 40px 0 0;
}

.posts {
  margin: 20px 0 0;
  gap: 20px;
}

.post {
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  border-radius: 40px;
  transition: 0.3s ease-in;
  box-shadow: -6px -6px 20px rgba(255, 255, 255, 1),
    6px 6px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: inset -6px -6px 20px rgba(255, 255, 255, 0.5),
      inset 6px 6px 20px rgba(0, 0, 0, 0.1);
  }
}
</style>
