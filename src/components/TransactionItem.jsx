import { formatRupiah } from '../utils/formatRupiah';

/** Emoji mapping per kategori transaksi */
const CATEGORY_EMOJI = {
  Makanan: '🍔',
  Transport: '🚗',
  Gaji: '💰',
  Belanja: '🛒',
  Hiburan: '🎮',
  Kesehatan: '💊',
  Pendidikan: '📚',
  Lainnya: '📋',
};

/**
 * Single transaction item — menampilkan satu baris transaksi
 * dengan emoji, judul, kategori, tanggal, nominal & tombol hapus.
 */
export default function TransactionItem({ transaction, onDelete }) {
  const { id, title, amount, type, category, date } = transaction;
  const emoji = CATEGORY_EMOJI[category] || '📋';
  const isIncome = type === 'income';

  return (
    <div className="tx-item">
      <div className="tx-item-left">
        <div className={`tx-emoji ${isIncome ? 'tx-emoji-income' : 'tx-emoji-expense'}`}>
          {emoji}
        </div>
        <div className="tx-detail">
          <span className="tx-title">{title}</span>
          <span className="tx-meta">
            {category} • {date}
          </span>
        </div>
      </div>
      <div className="tx-item-right">
        <span className={`tx-amount ${isIncome ? 'tx-amount-income' : 'tx-amount-expense'}`}>
          {isIncome ? '+' : '−'}{formatRupiah(amount)}
        </span>
        <button
          className="tx-delete-btn"
          onClick={() => onDelete(id)}
          aria-label={`Hapus transaksi ${title}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
