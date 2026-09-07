/**
 * Empty state — ditampilkan ketika belum ada transaksi.
 * Menampilkan ilustrasi SVG wallet + call-to-action.
 */
export default function EmptyState({ onAdd }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="20" width="64" height="44" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2"/>
          <rect x="8" y="20" width="64" height="14" rx="0" fill="#cbd5e1"/>
          <circle cx="54" cy="42" r="6" fill="#94a3b8"/>
          <rect x="16" y="46" width="20" height="4" rx="2" fill="#94a3b8"/>
          <rect x="16" y="54" width="14" height="4" rx="2" fill="#cbd5e1"/>
          <path d="M40 8 L44 16 L36 16 Z" fill="#cbd5e1"/>
        </svg>
      </div>
      <h3 className="empty-state-title">Belum Ada Catatan</h3>
      <p className="empty-state-desc">
        Mulai catat pemasukan dan pengeluaranmu untuk mengontrol keuangan harian.
      </p>
      <button className="empty-state-btn" onClick={onAdd}>
        + Tambah Transaksi Pertama
      </button>
    </div>
  );
}
