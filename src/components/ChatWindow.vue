<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import MessageBubble from './MessageBubble.vue'
import { initials, craftLabel } from '../helpers.js'

const props = defineProps({
  coach: Object,
  messages: Array,
})

const emit = defineEmits(['send'])

const newMessage = ref('')
const messagesBox = ref(null)

// I messaggi più recenti stanno in fondo: dopo ogni cambiamento riporto lì la vista
function scrollToBottom() {
  nextTick(() => {
    if (messagesBox.value !== null) {
      messagesBox.value.scrollTop = messagesBox.value.scrollHeight
    }
  })
}

onMounted(scrollToBottom)

// Serve sia quando arriva un messaggio nuovo sia quando si apre un'altra conversazione
watch(() => props.messages.length, scrollToBottom)
watch(() => props.coach.id, scrollToBottom)

function sendMessage() {
  const text = newMessage.value.trim()

  if (text === '') {
    return
  }

  emit('send', text)
  newMessage.value = ''
}
</script>

<template>
  <header class="chat-header">
    <span class="avatar">{{ initials(coach.name) }}</span>

    <div>
      <p class="chat-name">{{ coach.name }}</p>
      <p class="chat-craft">{{ craftLabel(coach.craft) }}</p>
    </div>
  </header>

  <div ref="messagesBox" class="messages">
    <MessageBubble v-for="message in messages" :key="message.id" :message="message" />
  </div>

  <form class="composer" @submit.prevent="sendMessage">
    <input
      v-model="newMessage"
      class="composer-input"
      type="text"
      placeholder="Scrivi un messaggio"
    />
    <button class="composer-button" type="submit">Invia</button>
  </form>
</template>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #e7e5e4;
  background-color: #ffffff;
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

.chat-name {
  margin: 0;
  font-weight: bold;
}

.chat-craft {
  margin: 2px 0 0;
  font-size: 14px;
  color: #78716c;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.composer {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #e7e5e4;
  background-color: #ffffff;
}

.composer-input {
  flex: 1;
  padding: 10px 12px;
  font-size: 15px;
  font-family: inherit;
  border: 1px solid #d6d3d1;
  border-radius: 20px;
}

.composer-button {
  padding: 10px 20px;
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  background-color: #0d9488;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.composer-button:hover {
  background-color: #0f766e;
}
</style>
