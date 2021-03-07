<template>
  <div class="header">
    <router-link to="/" class="header__logo">{{ AppName }}</router-link>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  name: "HomeLayout",
  data() {
    return {
      AppName: "WhyZakBlog",
    };
  },
};
</script>
<style lang=""></style>
