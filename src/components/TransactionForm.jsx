import { useState } from 'react';

/** Daftar kategori beserta emoji */
const CATEGORIES = [
  { value: 'Makanan', emoji: '🍔', label: 'Makanan' },
  { value: 'Transport', emoji: '🚗', label: 'Transport' },
  { value: 'Gaji', emoji: '💰', label: 'Gaji' },
  { value: 'Belanja', emoji: '🛒', label: 'Belanja' },
  { value: 'Hiburan', emoji: '🎮', label: 'Hiburan' },
  { value: 'Kesehatan', emoji: '💊', label: 'Kesehatan' },
  { value: 'Pendidikan', emoji: '📚', label: 'Pendidikan' },
  { value: 'Lainnya', emoji: '📋', label: 'Lainnya' },
];

/**
 * Transaction Form — Bottom sheet modal untuk menambah transaksi baru.
 * Muncul dengan slide-up animation + backdrop blur overlay.
 * Category selector menggunakan pill buttons, bukan dropdown.
 */
export default function TransactionForm({ isOpen, onClose, onSubmit, defaultType }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(defaultType || 'expense');
  const [category, setCategory] = useState('Makanan');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) return;

    await onSubmit({ title: title.trim(), amount, type, category });
    setTitle('');
    setAmount('');
    setCategory('Makanan');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet-content" onClick={(e) => e.stopPropagation()}>
        {/* Handle bar */}
        <div className="sheet-handle">
          <div className="sheet-handle-bar" />
        </div>

        <h3 className="sheet-title">Tambah Transaksi</h3>

        <form onSubmit={handleSubmit} className="sheet-form">
          {/* Type toggle */}
          <div className="type-toggle">
            <button
              type="button"
              className={`type-btn ${type === 'expense' ? 'type-btn-active type-btn-expense' : ''}`}
              onClick={() => setType('expense')}
            >
              ↓ Pengeluaran
            </button>
            <button
              type="button"
              className={`type-btn ${type === 'income' ? 'type-btn-active type-btn-income' : ''}`}
              onClick={() => setType('income')}
            >
              ↑ Pemasukan
            </button>
          </div>

          {/* Nominal */}
          <div className="form-field">
            <label className="field-label">Nominal</label>
            <div className="amount-input-wrapper">
              <span className="amount-prefix">Rp</span>
              <input
                type="number"
                className="amount-input"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="numeric"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Keterangan */}
          <div className="form-field">
            <label className="field-label">Keterangan</label>
            <input
              type="text"
              className="text-input"
              placeholder="Contoh: Beli kopi pagi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category pills */}
          <div className="form-field">
            <label className="field-label">Kategori</label>
            <div className="category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  className={`cat-pill ${category === cat.value ? 'cat-pill-active' : ''}`}
                  onClick={() => setCategory(cat.value)}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit-sheet">
            Simpan Transaksi
          </button>
        </form>
      </div>
    </div>
  );
}
