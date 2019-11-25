<template>
  <div class="mainElement">
    <div
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @click="setCurrentNote"
      class="singleNoteItem"
    >
      <h2 class="uk-card-title title-text">{{ note.title }}</h2>
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

      <!-- This is the modal -->
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
import { mapActions } from "vuex";

export default {
  name: "Note",
  components: {},
  props: ["note"],
  data() {
    return { hover: false };
  },
  methods: {
    // remove note
    ...mapActions(["deleteNote", "setCurNote"]),
    removeNote() {
      this.deleteNote(this.note._id);
    },
    setCurrentNote() {
      this.setCurNote(this.note);
    }
  }
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-text {
  font-size: 1rem;
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 150px;
  display: block;
  overflow: hidden;
}
.uk-label {
  height: 16px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  max-width: 300px;
  word-wrap: break-word;
}
.delete {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 5px;
  color: #999;
}
.delete:hover {
  color: #333;
}
.singleNoteItem {
  position: relative;
  transition: border-bottom 0.2s;
  height: 100px;
  margin: 0px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px transparent solid;
  box-shadow: 0 4px 5px -2px rgba(160, 160, 160, 0.349);
}

.singleNoteItem:hover {
  border-bottom: 2px #1e87f0 solid;
}
</style>
