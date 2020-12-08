<template>
  <b-card header="Form Register">
    <b-overlay :show="show" rounded="sm">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-alert v-if="error" variant="danger" show> {{ error }}</b-alert>
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
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
      show: false,
    };
  },
  methods: {
    async onSubmit() {
      this.show = true;
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {
              this.$router.replace({ name: "Dashboard" });
            });
        })
        .catch((err) => {
          this.error = err.message;
        });
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