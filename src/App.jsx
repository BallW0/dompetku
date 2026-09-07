import { useState } from 'react';
import { useTransactions } from './hooks/useTransactions';
import BalanceCard from './components/BalanceCard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import BackupRestore from './components/BackupRestore';
import BottomNav from './components/BottomNav';
import Toast, { showToast } from './components/Toast';
import './index.css';

/**
 * App Shell — komponen utama yang mengatur:
 * - Tab navigation (home / settings)
 * - Bottom sheet form untuk tambah transaksi
 * - Toast notification system
 */
export default function App() {
  const {
    transactions,
    income,
    expense,
    balance,
    addTransaction,
    deleteTransaction,
    exportJSON,
    importJSON,
  } = useTransactions();

  const [activeTab, setActiveTab] = useState('home');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('expense');

  // Greeting berdasarkan waktu
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Selamat Pagi', emoji: '☀️' };
    if (hour < 15) return { text: 'Selamat Siang', emoji: '🌤️' };
    if (hour < 18) return { text: 'Selamat Sore', emoji: '🌅' };
    return { text: 'Selamat Malam', emoji: '🌙' };
  };

  const greeting = getGreeting();

  const handleAdd = (type = 'expense') => {
    setFormType(type);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    await addTransaction(data);
    showToast('Transaksi berhasil disimpan!', 'success');
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    showToast('Transaksi dihapus', 'info');
  };

  const handleExport = () => {
    const success = exportJSON();
    if (success) {
      showToast('Backup berhasil diunduh!', 'success');
    } else {
      showToast('Belum ada data untuk di-backup', 'error');
    }
  };

  const handleImport = async (file) => {
    try {
      const count = await importJSON(file);
      showToast(`${count} transaksi berhasil dipulihkan!`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="app-shell">
      <Toast />
      

      {/* Main content area */}
      <main className="app-main">
        {activeTab === 'home' && (
          <div className="page-home">
            <BalanceCard balance={balance} income={income} expense={expense} />

            {/* Quick Actions */}
            <div className="quick-actions">
              <button className="quick-btn quick-btn-expense" onClick={() => handleAdd('expense')}>
                <span className="quick-btn-icon">↓</span>
                Pengeluaran
              </button>
              <button className="quick-btn quick-btn-income" onClick={() => handleAdd('income')}>
                <span className="quick-btn-icon">↑</span>
                Pemasukan
              </button>
            </div>

            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
              onAdd={() => handleAdd()}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="page-settings">
            <BackupRestore
              onExport={handleExport}
              onImport={handleImport}
              transactionCount={transactions.length}
            />
          </div>
        )}
      </main>

      {/* Bottom Sheet Form */}
      <TransactionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        defaultType={formType}
      />

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAdd={() => handleAdd()}
      />
    </div>
  );
}