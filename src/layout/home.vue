<template>
  <div class="blog" :class="{ dark: theme }">
    <div class="header">
      <router-link to="/" class="header__logo">{{ AppName }}</router-link>
      <toggle :selected="theme" @change="changeTheme($event)" />
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import toggle from "../components/toggle";
import { ThemeService } from "../service/storage.service";
export default {
  name: "HomeLayout",
  components: {
    toggle,
  },
  data() {
    return {
      AppName: "WhyZakBlog",
      theme: true,
    };
  },
  mounted() {
    this.theme = ThemeService.getTheme() === "dark";
  },
  methods: {
    changeTheme(status) {
      this.theme = status;
      ThemeService.setTheme(this.theme ? "dark" : "light");
    },
  },
};
</script>
<style></style>
