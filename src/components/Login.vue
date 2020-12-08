<template>
  <b-card header="Form Login">
    <b-overlay :show="show" rounded="sm">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-alert v-if="error" variant="danger" show> {{ error }}</b-alert>
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
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
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
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch((err) => {
          this.error = err.message;
        });
      this.show = false;
    },
    onReset() {
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>