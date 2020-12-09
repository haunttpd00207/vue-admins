<template>
  <b-card header="Form Register">
    <b-overlay :show="show" rounded="sm">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-alert v-if="errors" variant="danger" show> {{ errors }}</b-alert>
        <b-form-group label="Name:" label-for="name">
          <b-form-input
            id="name"
            placeholder="Enter name"
            v-model="form.name"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email address:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            required
            placeholder="Enter email"
            v-model="form.email"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Your Password:" label-for="password">
          <b-form-input
            id="password"
            type="password"
            required
            placeholder="Enter password"
            v-model="form.password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-3"
          >Register</b-button
        >
        <b-button type="reset" variant="danger">Clear</b-button>
      </b-form>
    </b-overlay>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
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
    ...mapActions(["signUp"]),
    async onSubmit() {
      this.show = true;
      await this.signUp({
        email: this.form.email,
        password: this.form.password,
        displayName: this.form.name,
      });
      if (!this.errors) {
        this.$router.replace({
          name: "Dashboard",
        });
      }
      this.show = false;
    },
    onReset() {
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>