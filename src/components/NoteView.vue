<template>
  <!-- View window for selected note -->
  <div class="noteview">
    <section>
      <transition name="fade" mode="out-in">
        <div
          v-if="!(!currentNote || Object.keys(currentNote).length === 0)"
          class="currentNoteView"
          :key="currentNote._id"
          @mouseover="hover = true"
          @mouseleave="hover = false"
        >
          <span
            v-if="hover"
            class="pencil"
            uk-icon="pencil"
            @click="editNote"
          ></span>

          <div v-if="this.editMode" class="editMode">
            <input
              v-model="currentNote.title"
              class="uk-input uk-padding-small edit-title"
              type="text"
              placeholder="Title"
            />

            <textarea
              v-model="currentNote.text"
              class="uk-textarea uk-margin edit-text"
              rows="5"
              placeholder="Textarea"
            ></textarea>

            <button
              v-if="editMode"
              class="uk-button save-button uk-button-primary uk-box-shadow-large"
              type="button"
              @click="save_edit"
            >
              Save
            </button>
          </div>

          <div v-else class="content">
            <h2 class="uk-h2 uk-heading-bullet uk-text-capitalize ">
              {{ currentNote.title }}
            </h2>

            <div>{{ currentNote.text }}</div>
          </div>
        </div>

        <div v-else class="uk-text-lighter uk-text-muted createText">
          Hey! <br />
          Create a new note...
        </div>
      </transition>

      <!-- This is a button toggling the modal -->
      <button
        class="uk-button uk-button-primary uk-margin-small-right plus-button uk-border-circle uk-box-shadow-large"
        type="button"
        uk-toggle="target: #modal-add-note"
      >
        +
      </button>

      <!-- Modal to add note -->
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
  computed: { ...mapGetters(["currentNote"]) },
  props: {},
  data() {
    return { hover: false, editMode: false };
  },
  methods: {
    ...mapActions(["saveEdit"]),

    save_edit(event) {
      this.saveEdit(this.currentNote);
      this.editMode = false;
      UIkit.notification({
        message: "<span uk-icon='icon: check'></span> Changes saved!",
        status: "success",
        pos: "top-center"
      });
    },

    editNote() {
      this.editMode = !this.editMode;
    }
  }
};
</script>

<style scoped>
section {
  height: 100%;
}
.edit-title {
  font-size: 1.6rem;
  padding: 25px 20px;
}
input[type="text"] {
  width: 80%;
}
.edit-text {
  height: 100%;
}
.content {
  width: 90%;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
}

.createText {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}
.currentNoteView {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding: 50px;
  text-align: left;
}

.noteview {
  height: 100%;
  overflow: scroll;
}
.plus-button {
  position: absolute;
  bottom: 40px;
  right: 40px;
  height: 75px;
  width: 75px;
  font-size: 50px;
  text-align: center;
  padding: 0px;
  margin: 0px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pencil {
  position: absolute;
  top: 55px;
  right: 55px;
  z-index: 9999;
  cursor: pointer;
}

.save-button {
  width: 200px;
  margin-left: auto;
}
</style>
