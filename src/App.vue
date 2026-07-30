<script setup>
// Dati di esempio copiati dall'API, per costruire il layout prima di collegarla
const coaches = [
  { id: 1, name: 'Marco Ferretti', craft: 'Ceramics', online: true },
  { id: 2, name: 'Sofia Ricci', craft: 'Textile & Weaving', online: true },
  { id: 3, name: 'Luca Bianchi', craft: 'Woodworking', online: false },
]

const messages = [
  {
    id: 1,
    from: 'coach',
    text: "Ciao! Sono Marco, il tuo coach di ceramica. Sono qui per guidarti nel mondo dell'argilla. Come posso aiutarti?",
  },
  {
    id: 2,
    from: 'user',
    text: 'Ciao Marco! Sono molto emozionata di iniziare. Vorrei imparare le basi della tornitura al tornio.',
  },
  {
    id: 3,
    from: 'coach',
    text: "Ottima scelta! La tornitura è la tecnica più soddisfacente. Ti consiglio di partire con l'argilla da 1kg.",
  },
]

const selectedCoach = coaches[0]

// Iniziali del nome e del cognome, usate al posto della foto del coach
function initials(name) {
  const parts = name.split(' ')

  return parts[0][0] + parts[1][0]
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
        <ul class="contact-list">
          <li
            v-for="coach in coaches"
            :key="coach.id"
            class="contact"
            :class="{ 'contact-selected': coach.id === selectedCoach.id }"
          >
            <span class="avatar">{{ initials(coach.name) }}</span>

            <div class="contact-text">
              <p class="contact-name">{{ coach.name }}</p>
              <p class="contact-craft">{{ coach.craft }}</p>
            </div>

            <span v-if="coach.online" class="online-dot" title="Online"></span>
          </li>
        </ul>
      </aside>

      <section class="chat">
        <header class="chat-header">
          <span class="avatar">{{ initials(selectedCoach.name) }}</span>
          <p class="chat-name">{{ selectedCoach.name }}</p>
        </header>

        <div class="messages">
          <div
            v-for="message in messages"
            :key="message.id"
            class="bubble"
            :class="message.from === 'user' ? 'bubble-user' : 'bubble-coach'"
          >
            {{ message.text }}
          </div>
        </div>

        <form class="composer" @submit.prevent>
          <input class="composer-input" type="text" placeholder="Scrivi un messaggio" />
          <button class="composer-button" type="submit">Invia</button>
        </form>
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
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #e7e5e4;
}

.chat-name {
  margin: 0;
  font-weight: bold;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #fafaf9;
}

.bubble {
  max-width: 70%;
  margin-bottom: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  line-height: 1.4;
}

.bubble-coach {
  background-color: #ffffff;
  border: 1px solid #e7e5e4;
}

.bubble-user {
  margin-left: auto;
  background-color: #d1fae5;
}

.composer {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #e7e5e4;
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
