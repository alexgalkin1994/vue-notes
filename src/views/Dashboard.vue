<template>
  <div class="bg">
    <Notes></Notes>
  </div>
</template>

<script>
import Notes from "../components/Notes.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: { Notes },
  props: {},
  data() {
    return {
      notes: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
