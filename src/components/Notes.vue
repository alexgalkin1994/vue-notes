<template>
  <div>
    <!-- Render all notes -->
    <div class="notes-container">
      <Note
        @removeNote="removeNote($event)"
        v-for="note in allNotes"
        :key="note.id"
        :note="note"
      ></Note>
    </div>
    <section>
      <!-- This is a button toggling the modal -->
      <button
        class="uk-button uk-button-default uk-margin-small-right plus-button uk-border-circle uk-box-shadow-large"
        type="button"
        uk-toggle="target: #modal-add-note"
      >
        +
      </button>

      <!-- This is the modal -->
      <div id="modal-add-note" uk-modal>
        <AddNote @added="add_note($event)"></AddNote>
      </div>
    </section>
  </div>
</template>

<script>
import Note from "./Note.vue";
import AddNote from "./AddNote.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Notes",
  components: { Note, AddNote },
  computed: { ...mapGetters(["allNotes"]) },
  props: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getNotes"])
    // Remove note from MongoDB
  },
  created() {
    this.getNotes();
  }
};
</script>

<style scoped>
.notes-container {
  list-style: none;
  display: flex;
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
