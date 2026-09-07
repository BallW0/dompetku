import { formatRupiah } from '../utils/formatRupiah';

/**
 * Balance Card — Hero card menampilkan total saldo, pemasukan & pengeluaran.
 * Menggunakan gradient background dengan glassmorphism decorative elements.
 */
export default function BalanceCard({ balance, income, expense }) {
  return (
    <div className="balance-card">
      {/* Decorative glassmorphism circles */}
      <div className="balance-card-decoration">
        <div className="deco-circle deco-circle-1" />
        <div className="deco-circle deco-circle-2" />
      </div>

      <div className="balance-card-content">
        <span className="balance-label">Total Saldo</span>
        <h2 className="balance-amount">{formatRupiah(balance)}</h2>

        <div className="balance-row">
          <div className="balance-stat">
            <div className="stat-icon stat-icon-income">↑</div>
            <div>
              <span className="stat-label">Pemasukan</span>
              <p className="stat-value stat-value-income">{formatRupiah(income)}</p>
            </div>
          </div>
          <div className="balance-stat">
            <div className="stat-icon stat-icon-expense">↓</div>
            <div>
              <span className="stat-label">Pengeluaran</span>
              <p className="stat-value stat-value-expense">{formatRupiah(expense)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
