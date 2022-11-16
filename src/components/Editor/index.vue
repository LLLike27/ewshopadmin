<template>
  <QuillEditor
    ref="editor"
    toolbar="full"
    theme="snow"
    @update:content="updateContent"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
const editor = ref();
const emit = defineEmits(["backContent"]);
const updateContent = () => {
  emit("backContent", editor.value.getHTML());
  //   console.log(e);
};
</script>

<style scoped></style>
