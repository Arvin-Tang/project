<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  created() {
    if (localStorage.token) {
      const decoded = jwt_decode(localStorage.token);
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
