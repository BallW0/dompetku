import Dexie from 'dexie';

// Inisialisasi database lokal di dalam HP
export const db = new Dexie('DompetkuLocalDB');

// Definisikan struktur tabel & index
db.version(1).stores({
  transactions: '++id, title, amount, type, category, date, createdAt'
});