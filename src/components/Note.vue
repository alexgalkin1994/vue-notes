<template>
  <div>
    <div
      class="uk-card uk-card-default uk-card-body uk-width-auto uk-margin .uk-margin-medium-right"
    >
      <h3 class="uk-card-title">{{ note.title }}</h3>
      <p class="text">{{ note.text }}</p>

      <!-- <button @click="removeNote" class="delete">Remove</button> -->
      <span @click="removeNote" class="delete" uk-icon="trash"></span>
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
    return {};
  },
  methods: {
    // remove note
    ...mapActions(["deleteNote"]),
    removeNote() {
      this.deleteNote(this.note._id);
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
</style>
