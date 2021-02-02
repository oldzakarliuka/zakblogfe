import { createStore } from "vuex";
import { PICK_EDIT_POST, PICK_POST, UPDATE_POSTS } from "./mutations";

const store = createStore({
  state() {
    return {
      posts: [],
      selectedPost: null,
      editPost: null,
    };
  },
  mutations: {
    [UPDATE_POSTS](state, payload) {
      state.posts = payload;
    },
    [PICK_POST](state, post) {
      state.post = post;
    },
    [PICK_EDIT_POST](state, post) {
      state.editPost = post;
    },
  },
  getters: {
    getPosts: (state) => {
      return state.posts;
    },
    getSelectedPost: (state) => {
      return state.post;
    },
    getPostById: (id) => {
      return (state) => state.posts.find((post) => post.id === id);
    },
    getEditPost: (state) => {
      return state.editPost;
    },
  },
  actions: {
    fetchPosts({ commit }, payload) {
      commit(UPDATE_POSTS, payload);
    },
  },
});

export default store;
