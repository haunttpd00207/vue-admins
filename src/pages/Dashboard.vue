<template>
  <div v-if="isAuthenticated" class="alert alert-success" role="alert">
    You are logged in! {{ currentUser.displayName }}
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
  },
};
</script>