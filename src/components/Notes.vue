<template>
  <div>
    <div class="notes-container">
      <Note @removeNote="removeNote($event)" v-for="note in notes" :key="note.id" :note="note"></Note>
    </div>
    <section>
      <button class="button is-medium plus-button is-dark" @click="isComponentModalActive = true">+</button>

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
import uuid from "uuid";

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
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    add_note(note) {
      let new_note = {
        id: uuid.v4(),
        text: note.text,
        importance: note.importance
      };

      axios
        .post("http://localhost:3000/notes", {
          text: note.text,
          importance: note.importance
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });

      this.notes.push(new_note);
      this.text = "";
      this.importance = 0;
    },
    removeNote(id) {
      axios
        .delete(`http://localhost:3000/notes/${id}`)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
      console.log(id);

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