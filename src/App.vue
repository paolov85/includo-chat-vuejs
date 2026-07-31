<script setup>
import { ref, computed, onMounted } from 'vue'

const BASE_URL = 'https://raw.githubusercontent.com/Anita-Liberatore/includo-chat-api/master'

// L'API restituisce il mestiere in inglese, ma l'applicazione è in italiano
const CRAFT_NAMES = {
  Ceramics: 'Ceramica',
  'Textile & Weaving': 'Tessitura',
  Woodworking: 'Falegnameria',
  Jewelry: 'Oreficeria',
  'Leather Goods': 'Pelletteria',
  Glassblowing: 'Soffiatura del vetro',
  Blacksmithing: 'Lavorazione del ferro',
  Bookbinding: 'Legatoria',
  Shoemaking: 'Calzoleria',
  'Candle Making': 'Candele artigianali',
}

const coaches = ref([])
const conversations = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

// La selezione è tenuta con l'id: il coach e i suoi messaggi si ricavano da qui
const selectedCoachId = ref(null)

// I due file arrivano insieme: servono entrambi per mostrare una conversazione
async function loadData() {
  try {
    const responses = await Promise.all([
      fetch(`${BASE_URL}/coaches.json`),
      fetch(`${BASE_URL}/conversations.json`),
    ])

    if (responses[0].ok === false || responses[1].ok === false) {
      throw new Error('Risposta non valida')
    }

    coaches.value = await responses[0].json()
    conversations.value = await responses[1].json()
  } catch (error) {
    errorMessage.value = 'Non è stato possibile caricare i coach. Riprova più tardi.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadData)

const selectedCoach = computed(() => {
  for (let i = 0; i < coaches.value.length; i++) {
    if (coaches.value[i].id === selectedCoachId.value) {
      return coaches.value[i]
    }
  }

  return null
})

// Ogni conversazione dell'API è legata al coach dal campo coachId
const selectedMessages = computed(() => {
  for (let i = 0; i < conversations.value.length; i++) {
    if (conversations.value[i].coachId === selectedCoachId.value) {
      return conversations.value[i].messages
    }
  }

  return []
})

// Dall'orario completo dell'API tengo solo ore e minuti, nel formato 09:15
function formatTime(timestamp) {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}

// Iniziali del nome e del cognome, usate al posto della foto del coach
function initials(name) {
  const parts = name.split(' ')

  return parts[0][0] + parts[1][0]
}

// Se un mestiere non è tradotto viene mostrato com'è, senza lasciare il posto vuoto
function craftLabel(craft) {
  if (CRAFT_NAMES[craft] === undefined) {
    return craft
  }

  return CRAFT_NAMES[craft]
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Artisan chat</h1>
      <p class="subtitle">IncluDO — i tuoi artigiani coach</p>
    </header>

    <div class="layout">
      <aside class="contacts">
        <p v-if="isLoading" class="feedback">Caricamento dei coach…</p>

        <p v-else-if="errorMessage !== ''" class="feedback feedback-error">
          {{ errorMessage }}
        </p>

        <ul v-else class="contact-list">
          <li
            v-for="coach in coaches"
            :key="coach.id"
            class="contact"
            :class="{ 'contact-selected': coach.id === selectedCoachId }"
            @click="selectedCoachId = coach.id"
          >
            <span class="avatar">{{ initials(coach.name) }}</span>

            <div class="contact-text">
              <p class="contact-name">{{ coach.name }}</p>
              <p class="contact-craft">{{ craftLabel(coach.craft) }}</p>
            </div>

            <span v-if="coach.online" class="online-dot" title="Online"></span>
          </li>
        </ul>
      </aside>

      <section class="chat">
        <p v-if="selectedCoach === null" class="empty">
          Seleziona un coach per leggere la conversazione
        </p>

        <template v-else>
          <header class="chat-header">
            <span class="avatar">{{ initials(selectedCoach.name) }}</span>

            <div>
              <p class="chat-name">{{ selectedCoach.name }}</p>
              <p class="chat-craft">{{ craftLabel(selectedCoach.craft) }}</p>
            </div>
          </header>

          <div class="messages">
            <div
              v-for="message in selectedMessages"
              :key="message.id"
              class="bubble"
              :class="message.from === 'user' ? 'bubble-user' : 'bubble-coach'"
            >
              <p class="bubble-text">{{ message.text }}</p>
              <p class="bubble-time">{{ formatTime(message.timestamp) }}</p>
            </div>
          </div>
        </template>
      </section>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 20px;
}

.app-header {
  margin-bottom: 16px;
}

h1 {
  font-size: 28px;
  margin: 0;
}

.subtitle {
  margin: 4px 0 0;
  color: #78716c;
}

.layout {
  display: flex;
  height: 540px;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
}

.contacts {
  width: 260px;
  border-right: 1px solid #e7e5e4;
  overflow-y: auto;
}

.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

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

.feedback {
  margin: 0;
  padding: 16px 12px;
  font-size: 15px;
  color: #78716c;
}

.feedback-error {
  color: #b91c1c;
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

.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fafaf9;
}

.empty {
  margin: auto;
  text-align: center;
  color: #78716c;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #e7e5e4;
  background-color: #ffffff;
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
