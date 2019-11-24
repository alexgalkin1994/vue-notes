<template>
  <div class="uk-modal-dialog uk-modal-body">
    <h2 class="uk-modal-title">Add a new note</h2>
    <form>
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input
            class="uk-input"
            type="text"
            placeholder="Titel"
            v-model="note.title"
          />
        </div>

        <div class="uk-margin">
          <select class="uk-select">
            <option>Cat 1</option>
            <option>Cat 2</option>
            <option>Cat 3</option>
            <option>New Cat</option>
          </select>
        </div>

        <div class="uk-margin">
          <textarea
            class="uk-textarea"
            rows="5"
            placeholder="Text..."
            maxlength="100000"
            v-model="note.text"
          ></textarea>
        </div>

        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
          <label
            ><input
              class="uk-radio"
              v-model="note.importance"
              type="radio"
              name="important"
              value="0"
              checked
            />
            Not Important</label
          >
          <label
            ><input
              class="uk-radio"
              v-model="note.importance"
              type="radio"
              name="important"
              value="1"
            />
            Slightly Important</label
          >
          <label
            ><input
              class="uk-radio"
              v-model="note.importance"
              type="radio"
              name="important"
              value="2"
            />
            Important</label
          >
          <label
            ><input
              class="uk-radio"
              v-model="note.importance"
              type="radio"
              name="important"
              value="3"
            />
            Very Important</label
          >
        </div>
      </fieldset>
    </form>
    <p class="uk-text-right">
      <button class="uk-button uk-button-default uk-modal-close" type="button">
        Cancel
      </button>
      <button
        class="uk-button uk-button-primary uk-modal-close"
        @click="add_new_note"
        type="button"
      >
        Save
      </button>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return { note: { title: "", text: "", importance: 0 } };
  },

  methods: {
    ...mapActions(["addNote"]),
    // Emit note to parent element
    add_new_note(event) {
      this.addNote(this.note);
      this.note.title = "";
      this.note.text = "";
      this.note.importance = 0;
    }
  }
};
</script>

<style scoped>
.wrap-buttons {
  display: flex;
}

.add-note-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
