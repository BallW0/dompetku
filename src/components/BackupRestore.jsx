import { useRef } from 'react';

/**
 * Backup & Restore — Halaman pengaturan untuk export/import data.
 * Menampilkan tombol backup dan restore dengan instruksi pengguna.
 */
export default function BackupRestore({ onExport, onImport, transactionCount }) {
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onImport(e.target.files[0]);
      // Reset input agar bisa import file yang sama lagi
      e.target.value = '';
    }
  };

  return (
    <div className="settings-page">
      <h3 className="section-title">Pengaturan</h3>

      {/* Info Section */}
      <div className="settings-card">
        <div className="settings-card-icon">📊</div>
        <div className="settings-card-info">
          <span className="settings-card-label">Total Transaksi</span>
          <span className="settings-card-value">{transactionCount} catatan</span>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-card-icon">📱</div>
        <div className="settings-card-info">
          <span className="settings-card-label">Penyimpanan</span>
          <span className="settings-card-value">100% Offline di perangkat</span>
        </div>
      </div>

      {/* Backup */}
      <div className="settings-section">
        <h4 className="settings-section-title">Backup & Restore</h4>
        <p className="settings-section-desc">
          Simpan data ke file JSON untuk dipindahkan ke perangkat lain atau sebagai cadangan.
        </p>

        <button className="settings-btn settings-btn-primary" onClick={onExport}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 10 10)"/>
            <path d="M3 14V15C3 16.1 3.9 17 5 17H15C16.1 17 17 16.1 17 15V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Backup Data (JSON)
        </button>

        <button
          className="settings-btn settings-btn-secondary"
          onClick={() => fileRef.current?.click()}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 17V7M10 7L6 11M10 7L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 10 10)"/>
            <path d="M3 6V5C3 3.9 3.9 3 5 3H15C16.1 3 17 3.9 17 5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Restore dari File
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          hidden
        />
      </div>

      {/* App Info */}
      <div className="app-info">
        <span className="app-info-name">DompetKu</span>
        <span className="app-info-version">v1.0.0 </span>
      </div>
    </div>
  );
}
