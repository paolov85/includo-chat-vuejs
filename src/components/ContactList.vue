<script setup>
import ContactItem from './ContactItem.vue'

defineProps({
  coaches: Array,
  selectedCoachId: Number,
})

defineEmits(['select'])
</script>

<template>
  <ul class="contact-list">
    <ContactItem
      v-for="coach in coaches"
      :key="coach.id"
      :coach="coach"
      :selected="coach.id === selectedCoachId"
      @select="$emit('select', coach.id)"
    />
  </ul>
</template>

<style scoped>
.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
