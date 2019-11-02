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

export default {
  name: "Notes",
  components: { Note, AddNote },
  props: {},
  data() {
    return {
      notes: [
        { id: 1, msg: "Guten Tag", importance: 1 },
        { id: 2, msg: "Guten Morgen", importance: 1 },
        { id: 3, msg: "Guten Abend", importance: 3 },
        { id: 4, msg: "Gute Nacht", importance: 0 }
      ],
      isComponentModalActive: false,
      noteProps: {
        msg: "",
        importance: 1
      }
    };
  },
  methods: {
    add_note(note) {
      let new_note = {
        id: uuid.v4(),
        msg: note.msg,
        importance: note.importance
      };
      this.notes.push(new_note);
      this.msg = "";
      this.importance = 0;
    },
    removeNote(id) {
      console.log(id);
      this.notes = this.notes.filter(el => {
        return el.id != id;
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