<template>
  <!-- Notes on the left side in the sidebar -->
  <div class="mainElement">
    <div
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @click="setCurrentNote"
      class="singleNoteItem"
      :class="{ activeNote: this.note._id == currentNote._id }"
    >
      <div class="dates">
        <span>{{ moment(this.date).format("MMMM Do YYYY") }}</span>
        <span>{{ moment(this.date).format("h:mm a") }}</span>
      </div>

      <h2 class="uk-text-capitalize">{{ note.title }}</h2>

      <div class="noteText">{{ note.text }}</div>

      <span v-if="note.importance === 1" class="uk-label uk-label-success"
        >Slightly Important</span
      >

      <span v-if="note.importance === 2" class="uk-label uk-label-warning"
        >Important</span
      >

      <span v-if="note.importance === 3" class="uk-label uk-label-danger"
        >Very Important</span
      >

      <!-- <button @click="removeNote" class="delete">Remove</button> -->
      <span
        v-if="hover"
        class="delete"
        uk-icon="trash"
        uk-toggle="target: #modal-example"
      ></span>

      <!-- Remove modal -->
      <div id="modal-example" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Remove Note?</h2>
          <p class="uk-text-right">
            <button
              class="uk-button uk-button-default uk-modal-close"
              type="button"
            >
              Cancel
            </button>
            <button
              class="uk-button uk-button-danger uk-modal-close"
              @click="removeNote"
              type="button"
            >
              Remove
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Note",
  components: {},
  props: ["note"],
  computed: { ...mapGetters(["currentNote"]) },
  data() {
    return {
      hover: false,
      selected: undefined,
      date: new Date(this.note.date)
    };
  },

  methods: {
    // remove note
    ...mapActions(["deleteNote", "setCurNote"]),
    removeNote() {
      this.deleteNote(this.note._id);
    },
    setCurrentNote() {
      this.setCurNote(this.note);
      this.selected = this.note._id;
    }
  }
};
</script>

<style scoped>
.dates {
  display: flex;
  justify-content: space-between;
}
li {
  display: flex;
}

h2 {
  margin: 0px;
  text-align: left;
  font-size: 1.6rem;
}
.title-text {
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 250px;
  display: block;
  overflow: hidden;
}
.uk-label {
  height: 16px;
  width: fit-content;
  font-size: 12px;
  display: flex;
}

.text {
  max-width: 300px;
  word-wrap: break-word;
}
.delete {
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 5px;
  color: #999;
}
.delete:hover {
  color: #333;
}
.singleNoteItem {
  position: relative;
  transition: border-bottom 0.2s;
  padding: 10px;
  height: 120px;
  margin-bottom: 10px;
  width: 250px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 4px #fff solid;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0);
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.singleNoteItem:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.18);
  transform: scale(1.01);
}
.activeNote {
  border-left: 4px #1e87f0 solid;
}

.noteText {
  height: 50px;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
</style>
