<template>
  <div class="wrapper">
    <Sidebar />

    <!-- Render all notes -->
    <NoteView />
  </div>
</template>

<script>
import Note from "./Note.vue";
import AddNote from "./AddNote.vue";
import Sidebar from "./Sidebar.vue";
import NoteView from "./NoteView.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Notes",
  components: { Note, AddNote, Sidebar, NoteView },
  computed: { ...mapGetters(["allNotes"]) },
  props: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getNotes"])
    // Remove note from MongoDB
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  overflow: hidden;
}

.divider {
  height: 94%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus-button {
  position: absolute;
  bottom: 40px;
  right: 40px;
  height: 75px;
  width: 75px;
  font-size: 50px;
  color: #666;
  text-align: center;
  padding: 0px;
  margin: 0px !important;
}
</style>
