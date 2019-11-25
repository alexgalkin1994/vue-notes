<template>
  <div class="sidebar">
    <SidebarNotes />
  </div>
</template>

<script>
import SidebarNotes from "./SidebarNotes.vue";
export default {
  name: "Sidebar",
  components: { SidebarNotes }
};
</script>

<style>
.sidebar {
  margin-left: 10px;
  height: 100%;
  overflow: scroll;
}
</style>
