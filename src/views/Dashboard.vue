<template>
  <div class="bg">
    <Notes></Notes>
  </div>
</template>

<script>
import Notes from "../components/Notes.vue";

export default {
  name: "Dashboard",
  components: { Notes },
  props: {},
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg {
  overflow: auto;
  height: 100%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
