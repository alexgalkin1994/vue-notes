<template>
  <div class="wrapper">
    <SingleNoteView
      v-for="note in allNotes.slice().reverse()"
      :key="note._id"
      :note="note"
      class="singleNote"
    ></SingleNoteView>
  </div>
</template>

<script>
import SingleNoteView from "./SingleNoteView";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SidebarNotes",
  components: { SingleNoteView },
  computed: { ...mapGetters(["allNotes"]) },
  data() {
    return {
      selected: undefined
    };
  },
  methods: {
    ...mapActions(["getNotes"])
  },
  created() {
    this.getNotes();
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
