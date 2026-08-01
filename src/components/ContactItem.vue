<script setup>
import { initials, craftLabel } from '../helpers.js'

defineProps({
  coach: Object,
  selected: Boolean,
})

defineEmits(['select'])
</script>

<template>
  <li class="contact" :class="{ 'contact-selected': selected }" @click="$emit('select')">
    <span class="avatar">{{ initials(coach.name) }}</span>

    <div class="contact-text">
      <p class="contact-name">{{ coach.name }}</p>
      <p class="contact-craft">{{ craftLabel(coach.craft) }}</p>
    </div>

    <span v-if="coach.online" class="online-dot" title="Online"></span>
  </li>
</template>

<style scoped>
.contact {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid #f5f5f4;
  cursor: pointer;
}

.contact:hover {
  background-color: #f5f5f4;
}

.contact-selected {
  background-color: #ecfdf5;
}

.avatar {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: #0f766e;
  background-color: #ccfbf1;
}

.contact-text {
  flex: 1;
  min-width: 0;
}

.contact-name {
  margin: 0;
  font-weight: bold;
}

.contact-craft {
  margin: 2px 0 0;
  font-size: 14px;
  color: #78716c;
}

.online-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #10b981;
}
</style>
