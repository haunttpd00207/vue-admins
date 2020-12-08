<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <template v-if="user.loggedIn">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ user.data.displayName }}</em>
            </template>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </template>
      <template v-else>
        <b-navbar-nav>
          <router-link to="/register" class="nav-link">Register</router-link>
          <router-link to="/login" class="nav-link">Login</router-link>
        </b-navbar-nav>
      </template>
    </b-collapse>
  </b-navbar>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login",
          });
        });
    },
  },
};
</script>