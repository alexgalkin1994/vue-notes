<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Note</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Text">
        <b-input v-model="msg" maxlength="10000" type="textarea"></b-input>
      </b-field>

      <div class="wrap-buttons">
        <b-select v-model="importance" name="importance">
          <option value="0">Not Important</option>
          <option value="1">Low Importance</option>
          <option value="2">Mid Importance</option>
          <option value="3">High Importance</option>
        </b-select>
        <b-button class="add-note-button" @click="add_note">Add Note</b-button>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      importance: 0
    };
  },

  methods: {
    add_note(event) {
      this.$emit("added", { msg: this.msg, importance: this.importance });
      this.$parent.close();
    }
  }
};
</script>

<style scoped>
.wrap-buttons {
  display: flex;
}

.add-note-button {
  margin-left: auto;
}
</style>