<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
  
<style scoped>
.page-header {
  background-color: #746657;
  color: #e7dfd8;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.page-header h1 {
  margin: 0;
  font-size: 36px;
  font-weight: bold;
}
</style>
  