<script setup>
import { formatTime } from '../helpers.js'

defineProps({
  message: Object,
})
</script>

<template>
  <div class="bubble" :class="message.from === 'user' ? 'bubble-user' : 'bubble-coach'">
    <p class="bubble-text">{{ message.text }}</p>
    <p class="bubble-time">{{ formatTime(message.timestamp) }}</p>
  </div>
</template>

<style scoped>
.bubble {
  max-width: 70%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 8px;
}

.bubble-coach {
  background-color: #ffffff;
  border: 1px solid #e7e5e4;
}

.bubble-user {
  margin-left: auto;
  background-color: #d1fae5;
}

.bubble-text {
  margin: 0;
  line-height: 1.4;
}

.bubble-time {
  margin: 4px 0 0;
  font-size: 12px;
  text-align: right;
  color: #78716c;
}
</style>
