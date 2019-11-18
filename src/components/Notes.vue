<template>
  <div>
    <!-- Render all notes -->
    <div class="notes-container">
      <Note
        @removeNote="removeNote($event)"
        v-for="note in notes"
        :key="note.id"
        :note="note"
      ></Note>
    </div>
    <section>
      <button class="" @click="isComponentModalActive = true">+</button>

      <!-- Popup to create a new note, opens AddNote -->
      <b-modal
        :active.sync="isComponentModalActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <AddNote @added="add_note($event)" v-bind="noteProps"></AddNote>
      </b-modal>
    </section>
  </div>
</template>

<script>
import Note from "./Note.vue";
import AddNote from "./AddNote.vue";
import axios from "axios";

export default {
  name: "Notes",
  components: { Note, AddNote },
  props: {},
  data() {
    return {
      notes: [],
      isComponentModalActive: false,
      noteProps: {
        text: "",
        importance: 1
      }
    };
  },
  mounted() {
    const self = this;

    axios
      .get("http://localhost:3000/notes")
      .then(function(response) {
        self.notes = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    // Post new note to MongoDB server
    add_note(note) {
      const self = this;
      console.log("hi");
      axios
        .post("http://localhost:3000/notes", {
          text: note.text,
          importance: note.importance
        })
        .then(function(response) {
          let new_note = {
            _id: response.data._id,
            text: note.text,
            importance: note.importance
          };

          // Push onto client array
          self.notes.push(new_note);
          self.text = "";
          self.importance = 0;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    // Remove note from MongoDB
    removeNote(id) {
      axios
        .delete(`http://localhost:3000/notes/${id}`)
        .then(function(response) {
          console.log("Post removed");
        })
        .catch(function(error) {
          console.error(error);
        });
      // Remove note from client array
      this.notes = this.notes.filter(el => {
        return el._id != id;
      });
    }
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
  border-radius: 50%;
  height: 65px;
  width: 65px;
}
</style>
