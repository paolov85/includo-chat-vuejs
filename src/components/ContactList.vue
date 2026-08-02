<script setup>
import { ref, computed } from 'vue'
import ContactItem from './ContactItem.vue'
import { craftLabel } from '../helpers.js'

const props = defineProps({
  coaches: Array,
  selectedCoachId: Number,
})

defineEmits(['select'])

const search = ref('')

// La ricerca guarda il nome e il mestiere tradotto, cioè quello che si legge a schermo
const filteredCoaches = computed(() => {
  const text = search.value.trim().toLowerCase()

  if (text === '') {
    return props.coaches
  }

  const found = []

  for (let i = 0; i < props.coaches.length; i++) {
    const coach = props.coaches[i]
    const name = coach.name.toLowerCase()
    const craft = craftLabel(coach.craft).toLowerCase()

    if (name.includes(text) || craft.includes(text)) {
      found.push(coach)
    }
  }

  return found
})
</script>

<template>
  <div class="search">
    <input v-model="search" class="search-input" type="search" placeholder="Cerca un coach" />
  </div>

  <p v-if="filteredCoaches.length === 0" class="no-result">Nessun coach trovato</p>

  <ul v-else class="contact-list">
    <ContactItem
      v-for="coach in filteredCoaches"
      :key="coach.id"
      :coach="coach"
      :selected="coach.id === selectedCoachId"
      @select="$emit('select', coach.id)"
    />
  </ul>
</template>

<style scoped>
.search {
  padding: 10px 12px;
  border-bottom: 1px solid #e7e5e4;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid #d6d3d1;
  border-radius: 20px;
}

.no-result {
  margin: 0;
  padding: 16px 12px;
  font-size: 15px;
  color: #78716c;
}

.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
