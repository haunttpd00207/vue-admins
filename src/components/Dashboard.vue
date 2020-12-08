<template>
  <div v-if="user" class="alert alert-success" role="alert">
    You are logged in!
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>