<template>
  <div
    class="uk-section uk-section-muted uk-flex"
    uk-height-viewport="offset-top: true"
  >
    <div class="uk-width-1-1 uk-animation-fade">
      <div class="uk-container">
        <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
          <div class="uk-width-1-1@m">
            <div
              class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
            >
              <h3 class="uk-card-title uk-text-center">Login</h3>
              <form @submit.prevent="loginUser">
                <div class="uk-margin">
                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input
                      placeholder="username"
                      v-model="username"
                      class="uk-input uk-form-large"
                      type="text"
                    />
                  </div>
                </div>
                <div class="uk-margin">
                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input
                      placeholder="password"
                      class="uk-input uk-form-large"
                      type="password"
                      v-model="password"
                    />
                  </div>
                </div>
                <div class="uk-margin">
                  <input
                    type="submit"
                    value="Login"
                    class="uk-button uk-button-primary uk-button-large uk-width-1-1"
                  />
                </div>
                <div class="uk-text-small uk-text-center">
                  <div class="uk-flex-center">
                    Not registered?
                    <router-link class="uk-margin-left" to="/register"
                      >Create an account</router-link
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      this.login(user)
        .then(res => {
          this.$router.push("dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
