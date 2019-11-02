<template>
  <div class="wrapper">
    <b-message
      :type="{'is-success': note.importance == 1,'is-warning': note.importance == 2, 'is-danger': note.importance == 3 }"
    >
      <button @click="removeNote" class="delete"></button>
      {{note.msg}}
    </b-message>
  </div>
</template>

<script>
export default {
  name: "Note",
  components: {},
  props: { note: Object },
  data() {
    return {};
  },
  methods: {
    removeNote() {
      this.$emit("removeNote", this.note.id);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  margin: 40px 0px 0px 40px;
}
.importance-indicator {
  height: 10px;
  width: 10px;
  margin: 10px;
  border-radius: 50%;
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
}

.green-highlight {
  background-color: green;
}

.yellow-highlight {
  background-color: yellow;
}

.red-highlight {
  background-color: red;
}
</style>
