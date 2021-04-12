<template>
  <div class="auth">
    <form class="form auth-form" @submit.prevent="signup">
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
          id="name"
          class="form__input"
          type="text"
          placeholder="Name"
          v-model.trim.lazy="name"
        />
      </div>
      <div class="form__row">
        <input
          id="email"
          class="form__input"
          type="email"
          placeholder="Email"
          v-model.trim.lazy="email"
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
      <div class="form__row">
        <input
          id="confirmPassword"
          class="form__input"
          type="password"
          placeholder="Confirm password"
          v-model.lazy="confirmPassword"
        />
      </div>
      <button class="btn btn-blue">Sign up</button>
      <hr />
      <router-link to="/admin">Sign in?</router-link>
    </form>
  </div>
</template>
<script>
import api from "../service/http.service";
import TokenService from "../service/storage.service";

export default {
  name: "auth-signup",
  data() {
    return {
      errors: [],
      login: "",
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
  },
  methods: {
    clearInputs() {
      this.login = "";
      this.name = "";
      this.password = "";
      this.confirmPassword = "";
      this.email = "";
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
      if (!this.name) {
        this.errors.push(requiredStr("Name"));
      }
      if (this.name.length < 2) {
        this.errors.push(minLengthStr("Name", 2));
      }
      if (this.password.length < 6) {
        this.errors.push(minLengthStr("Password", 6));
      }
      if (!this.confirmPassword) {
        this.errors.push(requiredStr("Confirm Password"));
      }
      if (this.confirmPassword !== this.password) {
        this.errors.push("Password and confirm password does not match");
      }
      if (!this.email) {
        this.errors.push(requiredStr("Email"));
      }
      return this.errors.length;
    },
    signup() {
      if (this.checkForm()) return;

      api()
        .post("auth/signup", {
          login: this.login,
          password: this.password,
          email: this.email,
          name: this.name,
        })
        .then((res) => {
          TokenService.saveToken(res.token);
          this.$router.push("/admin/dashboard");
        })
        .catch((err) => {
          if (err.response?.status === 422) {
            this.errors = [err.response.data.error];
            setTimeout(() => (this.errors = []), 5000);
            this.clearInputs();
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.auth {
  height: 100%;
  position: absolute;
  width: 100%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
}
.form {
  min-width: 320px;
  padding: 40px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 5px;
  margin: auto;
  text-align: center;
  &__row {
    display: flex;
    margin: 10px auto;
  }
  &__input {
    font-size: 20px;
    border-radius: 5px;
    padding: 8px 10px;
    width: 100%;
    border: 1px solid #dddfe2;
  }
}
.btn {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
