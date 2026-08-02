# Artisan chat — Progetto Vue.js

Progetto del modulo Vue.js (corso "Master Web Developer Full Stack", start2impact): la chat di IncluDO, un centro di formazione che insegna mestieri artigianali a migranti e persone in percorso di reinserimento. Ogni allievo è seguito da un artigiano coach, e questa applicazione è lo strumento con cui i due si scrivono.

## Prova subito il progetto

L'applicazione è online e non richiede alcuna installazione: **[splendid-mandazi-19d79a.netlify.app](https://splendid-mandazi-19d79a.netlify.app)**

Le sezioni seguenti riguardano lo sviluppo in locale, utile solo per leggere o modificare il codice sorgente.

## Come funziona

All'avvio l'applicazione scarica da un'API pubblica l'elenco dei coach e le conversazioni già avviate. Selezionando un coach dalla colonna di sinistra si apre la sua conversazione: i messaggi del coach stanno a sinistra, i propri a destra, ognuno con l'orario.

Il messaggio scritto nel form in basso compare subito nella chat, e dopo cinque secondi arriva la risposta del coach. Il campo in cima alla lista filtra i contatti per nome o mestiere.

Su schermi stretti le due colonne non stanno affiancate: la lista dei contatti si sposta sopra la conversazione.

## Struttura del progetto

```
├── index.html                    # pagina che ospita l'applicazione
├── vite.config.js                # configurazione di Vite
└── src/
    ├── main.js                   # punto d'ingresso: monta l'app Vue
    ├── style.css                 # stili globali
    ├── helpers.js                # funzioni usate da più componenti
    ├── App.vue                   # dati, stato e layout della pagina
    └── components/
        ├── ContactList.vue       # ricerca e lista dei contatti
        ├── ContactItem.vue       # singolo contatto
        ├── ChatWindow.vue        # conversazione aperta
        └── MessageBubble.vue     # singolo messaggio
```

- **`App.vue`** — carica i due file dell'API e custodisce lo stato dell'applicazione. Della selezione conserva solo l'id del coach: il coach corrispondente e i suoi messaggi sono proprietà calcolate, così il contatto evidenziato e la conversazione mostrata non possono andare fuori sincrono.
- **`ContactList.vue`** — filtra i coach in base al testo cercato, confrontandolo con il nome e con il mestiere tradotto, cioè quello che si legge a schermo. Non decide quale contatto è attivo: segnala al genitore quale è stato scelto.
- **`ContactItem.vue`** e **`MessageBubble.vue`** — non conoscono il resto dell'applicazione: ricevono un coach o un messaggio e si limitano a mostrarlo.
- **`ChatWindow.vue`** — mostra la conversazione e riporta la vista in fondo quando arriva un messaggio o si cambia coach.

I dati scendono ai componenti figli come proprietà e le azioni dell'utente risalgono come eventi: nessun componente figlio modifica lo stato, che resta tutto in `App.vue`.

## Installazione

Serve [Node.js](https://nodejs.org/) 22.12 o superiore (va bene anche la linea 20, dalla versione 20.19 in poi).

```bash
git clone https://github.com/paolov85/includo-chat-vuejs.git
cd includo-chat-vuejs
npm install
```

## Configurazione

Non è richiesta alcuna configurazione: nessuna variabile d'ambiente, nessuna chiave. I dati arrivano da un'API pubblica che non richiede autenticazione.

## Utilizzo

Avvia il server di sviluppo:

```bash
npm run dev
```

L'applicazione è raggiungibile all'indirizzo indicato nel terminale (di norma `http://localhost:5173`).

Per generare la versione ottimizzata nella cartella `dist/`:

```bash
npm run build
```

Per provare in locale il risultato della build (di norma su `http://localhost:4173`):

```bash
npm run preview
```
