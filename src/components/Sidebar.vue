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
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  overflow: scroll;
  background-color: #eee;
  display: flex;
  justify-content: center;
}
</style>
