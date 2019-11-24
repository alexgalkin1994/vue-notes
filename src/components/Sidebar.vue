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
  height: 100%;
  overflow: scroll;
}
</style>
