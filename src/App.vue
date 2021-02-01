<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  mounted() {
    this.fetchPosts("hello wrold");
  },
  computed: {
    ...mapGetters([
      "getPosts",
      "getSelectedPost",
      // ...
    ]),
  },
};
</script>

<style></style>
