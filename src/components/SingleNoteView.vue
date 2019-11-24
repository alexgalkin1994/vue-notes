<template>
  <div>
    <div
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @click="setCurrentNote"
      class="single uk-card uk-card-default uk-card-body uk-width-auto uk-margin .uk-margin-medium-right"
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
        @click.stop="removeNote"
        class="delete"
        uk-icon="trash"
      ></span>
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
  top: 10px;
  right: 10px;
}
.single {
  height: 100px;
  margin: 0px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
