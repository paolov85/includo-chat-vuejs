<script setup>
import { ref, computed, onMounted } from 'vue'
import ContactList from './components/ContactList.vue'
import ChatWindow from './components/ChatWindow.vue'

const BASE_URL = 'https://raw.githubusercontent.com/Anita-Liberatore/includo-chat-api/master'

// Risposta che il coach manda da solo cinque secondi dopo il messaggio dell'allievo
const AUTO_REPLY = 'Ciao! Grazie per avermi scritto.'
const AUTO_REPLY_DELAY = 5000

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
function findConversation(coachId) {
  for (let i = 0; i < conversations.value.length; i++) {
    if (conversations.value[i].coachId === coachId) {
      return conversations.value[i]
    }
  }

  return null
}

const selectedMessages = computed(() => {
  const conversation = findConversation(selectedCoachId.value)

  if (conversation === null) {
    return []
  }

  return conversation.messages
})

function addMessage(coachId, from, text) {
  const conversation = findConversation(coachId)

  if (conversation === null) {
    return
  }

  conversation.messages.push({
    id: Date.now(),
    from: from,
    text: text,
    timestamp: new Date().toISOString(),
  })
}

function sendMessage(text) {
  // L'id va tenuto da parte: se cambio coach durante l'attesa, la risposta
  // deve comunque finire nella conversazione a cui ho scritto
  const coachId = selectedCoachId.value

  addMessage(coachId, 'user', text)

  setTimeout(() => {
    addMessage(coachId, 'coach', AUTO_REPLY)
  }, AUTO_REPLY_DELAY)
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

        <ContactList
          v-else
          :coaches="coaches"
          :selected-coach-id="selectedCoachId"
          @select="selectedCoachId = $event"
        />
      </aside>

      <section class="chat">
        <p v-if="selectedCoach === null" class="empty">
          Seleziona un coach per leggere la conversazione
        </p>

        <ChatWindow
          v-else
          :coach="selectedCoach"
          :messages="selectedMessages"
          @send="sendMessage"
        />
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

.feedback {
  margin: 0;
  padding: 16px 12px;
  font-size: 15px;
  color: #78716c;
}

.feedback-error {
  color: #b91c1c;
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
</style>
