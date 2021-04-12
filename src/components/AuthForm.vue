<template>
  <div class="auth">
    <form class="form auth-form" @submit.prevent="signin">
      <ul class="errors">
        <li v-for="err in errors" :key="err" class="error">
          {{ err }}
        </li>
      </ul>
      <div class="form__row">
        <input
          id="login"
          class="form__input"
          type="text"
          placeholder="Login"
          v-model.trim.lazy="login"
        />
      </div>
      <div class="form__row">
        <input
          id="password"
          class="form__input"
          type="password"
          placeholder="Password"
          v-model.lazy="password"
        />
      </div>
      <button class="btn btn-blue">Sign in</button>
      <hr />
      <router-link to="/admin/signup">Create New Account</router-link>
    </form>
  </div>
</template>
<script>
import api from "../service/http.service";
import { TokenService } from "../service/storage.service";

export default {
  name: "auth-signin",
  data() {
    return {
      errors: [],
      login: "",
      password: "",
    };
  },
  methods: {
    clearInputs() {
      this.login = "";
      this.password = "";
    },
    checkForm() {
      this.errors = [];
      const requiredStr = (label) => `${label} are required`;
      const minLengthStr = (label, count) =>
        `${label} must be at least ${count} characters`;
      if (!this.password) {
        this.errors.push(requiredStr("Password"));
      }
      if (!this.login) {
        this.errors.push(requiredStr("Login"));
      }
      if (this.password.length < 6) {
        this.errors.push(minLengthStr("Password", 6));
      }
      return this.errors.length;
    },
    signin() {
      if (this.checkForm()) return;
      api()
        .post("auth/signin", {
          login: this.login,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          TokenService.saveToken(res.token);
          this.$router.push("/admin/dashboard");
        })
        .catch((err) => {
          if ([404, 401].includes(err.response?.status)) {
            this.errors.push("Incorrect username or password");
            setTimeout(() => (this.errors = []), 5000);
            this.clearInputs();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
