<template>
  <!-- View window for selected note -->
  <div class="noteview">
    <section>
      <transition name="fade" mode="out-in">
        <div class="currentNoteView" :key="currentNote._id">
          <h2>{{ currentNote.title }}</h2>

          <p>{{ currentNote.text }}</p>
        </div>
      </transition>

      <!-- This is a button toggling the modal -->
      <button
        class="uk-button uk-button-default uk-margin-small-right plus-button uk-border-circle uk-box-shadow-large"
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
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.currentNoteView {
  padding: 50px;
  text-align: left;
}

.noteview {
  background-color: #eee;
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
  color: #666;
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
</style>
