import TransactionItem from './TransactionItem';
import EmptyState from './EmptyState';

/**
 * Transaction List — menampilkan riwayat transaksi yang dikelompokkan per tanggal.
 * Menampilkan EmptyState jika belum ada data.
 */
export default function TransactionList({ transactions, onDelete, onAdd }) {
  if (transactions.length === 0) {
    return <EmptyState onAdd={onAdd} />;
  }

  // Group transactions by date
  const grouped = transactions.reduce((acc, t) => {
    const key = t.date || 'Tanpa Tanggal';
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  // Label tanggal relatif
  const today = new Date().toLocaleDateString('id-ID');
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('id-ID');

  function getDateLabel(dateStr) {
    if (dateStr === today) return 'Hari Ini';
    if (dateStr === yesterday) return 'Kemarin';
    return dateStr;
  }

  return (
    <div className="tx-list-section">
      <h3 className="section-title">Riwayat Transaksi</h3>
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="tx-date-group">
          <span className="tx-date-label">{getDateLabel(date)}</span>
          <div className="tx-group-items">
            {items.map((t, index) => (
              <div key={t.id} className="tx-item-wrapper" style={{ animationDelay: `${index * 50}ms` }}>
                <TransactionItem transaction={t} onDelete={onDelete} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
