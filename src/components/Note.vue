<template>
  <div>
    <div
      class="uk-card uk-card-default uk-card-body uk-width-auto uk-margin .uk-margin-medium-right"
    >
      <h3 class="uk-card-title">Title</h3>
      <p>
        {{ note.text }}
      </p>
      <button @click="removeNote" class="delete"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Note",
  components: {},
  props: ["note"],
  data() {
    return {};
  },
  methods: {
    // Emit note to parent element for removal
    removeNote() {
      this.$emit("removeNote", this.note._id);
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
</style>
