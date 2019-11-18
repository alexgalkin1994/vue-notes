<template>
  <div class="home">
    <Dashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from "@/views/Dashboard.vue";

export default {
  name: "home",
  components: {
    Dashboard
  }
};
</script>

<style scoped></style>
