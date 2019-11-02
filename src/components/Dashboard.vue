<template>
  <div class="bg">
    <Notes></Notes>
  </div>
</template>

<script>
import Notes from "./Notes.vue";

export default {
  name: "Dashboard",
  components: { Notes },
  props: {},
  data() {
    return {
      notes: [
        { id: 1, msg: "Guten Tag", importance: 1 },
        { id: 2, msg: "Guten Morgen", importance: 1 },
        { id: 3, msg: "Guten Abend", importance: 3 },
        { id: 4, msg: "Gute Nacht", importance: 0 }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg {
  background-color: #262833;
  height: 100vh;
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
