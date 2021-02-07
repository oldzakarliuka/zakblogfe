<template>
  <div class="posts">
    <div
      class="post"
      v-for="{ title, thumb, id } of getPosts"
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
import api from "../service/api.service";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { PICK_POST, UPDATE_POSTS } from "../store/mutations";
export default {
  name: "home-dashboard",
  methods: {
    ...mapActions(["fetchPosts"]),
    ...mapMutations([PICK_POST, UPDATE_POSTS]),
    navigateTo(id) {
      const post = this.getPosts.find((post) => post.id === id);
      this[PICK_POST](post);
      this.$router.push({
        path: `/post/${id}`,
      });
    },
  },
  computed: {
    ...mapGetters(["getPosts"]),
  },
  mounted() {
    if (!this.getPosts.length) {
      api()
        .get("post")
        .then((res) => {
          this.fetchPosts(res);
        })
        .catch(() => {
          alert("Ooops smth wrong! \n Try to reload the page!");
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.post__thumb {
  height: 200px;
  width: 100%;
}

.post {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in;
}
</style>
