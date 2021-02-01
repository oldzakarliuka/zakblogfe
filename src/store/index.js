import { createStore } from "vuex";
import { PICK_POST, UPDATE_POSTS } from "./mutations";

const store = createStore({
  state() {
    return {
      posts: [],
      selectedPost: null,
    };
  },
  mutations: {
    [UPDATE_POSTS](state, payload) {
      state.posts = payload;
    },
    [PICK_POST](state, post) {
      state.post = post;
    },
  },
  getters: {
    getPosts: (state) => {
      return state.posts;
    },
    getSelectedPost: (state) => {
      return state.post;
    },
  },
  actions: {
    fetchPosts({ commit }, payload) {
      console.log(payload);
      return new Promise((resolve) => {
        setTimeout(() => {
          const payload = [1, 2, 3];
          commit(UPDATE_POSTS, payload);
          resolve();
        }, 1000);
      });
    },
  },
});

export default store;
