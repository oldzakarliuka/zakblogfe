<template>
  <div class="posts">
    <div
      class="post"
      v-for="{ title, thumb, id } of posts"
      :key="title + id"
      @click="navigateTo(id)"
    >
      <button class="post__del" @click.stop.prevent="deletePost(id)">x</button>
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
import { loadPosts, delPost } from "../service/api.service";
export default {
  name: "admin-dashboard",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    navigateTo(id) {
      this.$router.push({
        path: `post/${id}`,
      });
    },
    async deletePost(id) {
      try {
        const response = await delPost(id);
        if (response.success) {
          this.posts = this.posts.filter((post) => post.id !== id);
        }
      } catch (e) {
        console.error(e);
        alert(
          "Ooops! Something went wrong! Please reload the page and try again!"
        );
      }
    },
  },
  async mounted() {
    this.posts = await loadPosts();
  },
};
</script>
<style lang="scss" scoped>
.post__thumb {
  height: 200px;
  width: 100%;
}

.post__del {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: 0.2s ease-in;
  width: 40px;
  height: 40px;
  font-size: 24px;
  border: 1px solid transparent;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  z-index: 100;
  cursor: pointer;
  &:hover {
    background-color: #000;
  }
}

.post {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in;

  &:hover {
    .post__del {
      opacity: 1;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
