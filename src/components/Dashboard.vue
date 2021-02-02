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
<style lang="scss">
.posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

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
