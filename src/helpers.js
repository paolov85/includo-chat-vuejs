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

// Iniziali del nome e del cognome, usate al posto della foto del coach
export function initials(name) {
  const parts = name.split(' ')

  return parts[0][0] + parts[1][0]
}

// Se un mestiere non è tradotto viene mostrato com'è, senza lasciare il posto vuoto
export function craftLabel(craft) {
  if (CRAFT_NAMES[craft] === undefined) {
    return craft
  }

  return CRAFT_NAMES[craft]
}

// Dall'orario completo dell'API tengo solo ore e minuti, nel formato 09:15
export function formatTime(timestamp) {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}
