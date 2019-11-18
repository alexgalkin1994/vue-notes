<template>
  <nav class="uk-navbar-container uk-dark" uk-navbar>
    <router-link class="uk-navbar-item uk-logo" to="/">Vue Notes</router-link>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li v-if="isLoggedIn" class=".uk-flex-column">
          <router-link class="uk-navbar-item" to="/profile"
            >Profile</router-link
          >
        </li>
        <li v-if="isLoggedIn" class=".uk-flex-column">
          <router-link class="uk-navbar-item" to="/dashboard"
            >Dashboard</router-link
          >
        </li>
        <li v-if="!isLoggedIn">
          <router-link class="uk-navbar-item" to="/login">Login</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link class="uk-navbar-item" to="/register"
            >Register</router-link
          >
        </li>
        <li v-if="isLoggedIn">
          <a @click.prevent="logoutUser" class="uk-navbar-item" to="/register"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: { ...mapGetters(["isLoggedIn"]) },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    }
  }
};
</script>

<style></style>
