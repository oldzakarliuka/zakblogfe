<template>
  <div class="auth">
    <form class="form auth-form" @submit.prevent="signin">
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
import api from "../service/api.service";

export default {
  data() {
    return {
      errors: [],
      login: "",
      password: "",
    };
  },
  methods: {
    signin() {
      api()
        .post("auth/signin", {
          login: this.login,
          password: this.password,
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss">
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
