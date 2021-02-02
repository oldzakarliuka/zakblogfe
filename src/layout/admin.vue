<template>
  <div class="header">
    <router-link to="/admin" class="header__logo">admin</router-link>
    <menu>
      <router-link
        v-for="link of links"
        :to="link.path"
        class="header__logo"
        :key="`link${link.path}`"
      >
        {{ link.label }}
      </router-link>
      <a href="#" class="header__logo" @click.prevent="signout">signout</a>
    </menu>
  </div>
  <router-view></router-view>
</template>
<script>
import TokenService from "../service/storage.service";
export default {
  data() {
    return {
      links: [
        {
          path: "/admin/create",
          label: "create",
        },
      ],
    };
  },
  methods: {
    signout() {
      TokenService.removeToken();
      this.$router.push("/admin");
    },
  },
};
</script>
<style lang="scss">
.header {
  justify-content: space-between;
}
</style>
