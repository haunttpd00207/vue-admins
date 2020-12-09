<template>
  <b-card header="Form Login">
    <b-overlay :show="show" rounded="sm">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-alert v-if="errors" variant="danger" show> {{ errors }}</b-alert>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="email"
            type="email"
            required
            placeholder="Enter email"
            v-model="form.email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Your Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            required
            placeholder="Enter password"
            v-model="form.password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-3">Login</b-button>
        <b-button type="reset" variant="danger">Clear</b-button>
      </b-form>
    </b-overlay>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: false,
    };
  },
  computed: {
    ...mapGetters(["errors"]),
  },
  methods: {
    ...mapActions(["signIn"]),
    async onSubmit() {
      this.show = true;
      await this.signIn({
        email: this.form.email,
        password: this.form.password,
      });
      if (!this.errors) {
        this.$router.replace({
          name: "Dashboard",
        });
      }
      this.show = false;
    },
    onReset() {
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>