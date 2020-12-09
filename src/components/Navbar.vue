<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <router-link to="/dashboard" class="navbar-brand">Home</router-link>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <template v-if="isAuthenticated">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ currentUser.displayName }}</em>
            </template>
            <b-dropdown-item @click="signingOut">Sign Out</b-dropdown-item>
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
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(["signOut"]),
    async signingOut() {
      await this.signOut();
      await this.$router.replace({
        name: "Login",
      });
    },
  },
};
</script>