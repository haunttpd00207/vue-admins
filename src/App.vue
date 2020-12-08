<template>
  <div id="app">
    <Navbar></Navbar>
    <b-container class="mt-3">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
