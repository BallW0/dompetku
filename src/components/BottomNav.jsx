/**
 * Bottom Navigation Bar — tab navigation untuk mobile app.
 * 3 tab: Beranda, Tambah (FAB), Pengaturan
 * Includes safe area padding.
 */
export default function BottomNav({ activeTab, onTabChange, onAdd }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'home' ? 'nav-item-active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
            fill={activeTab === 'home' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Beranda</span>
      </button>

      <button className="nav-fab" onClick={onAdd}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      <button
        className={`nav-item ${activeTab === 'settings' ? 'nav-item-active' : ''}`}
        onClick={() => onTabChange('settings')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M19.4 15C19.2 15.3 19.2 15.7 19.4 16L20.1 17.3C20.3 17.6 20.2 18 19.9 18.2L18.2 19.9C18 20.1 17.6 20.2 17.3 20L16 19.4C15.7 19.2 15.3 19.2 15 19.4L14.6 19.6C14.3 19.8 14.1 20.1 14.1 20.4L14 22C14 22.3 13.8 22.6 13.4 22.6H11.6C11.3 22.6 11 22.4 11 22L10.9 20.4C10.9 20.1 10.7 19.8 10.4 19.6L10 19.4C9.7 19.2 9.3 19.2 9 19.4L7.7 20C7.4 20.2 7 20.1 6.8 19.8L5.1 18.1C4.9 17.9 4.8 17.5 5 17.2L5.6 15.9C5.8 15.6 5.8 15.2 5.6 14.9L5.4 14.5C5.2 14.2 4.9 14 4.6 14L3 13.9C2.7 13.9 2.4 13.7 2.4 13.3V11.5C2.4 11.2 2.6 10.9 3 10.9L4.6 10.8C4.9 10.8 5.2 10.6 5.4 10.3L5.6 9.9C5.8 9.6 5.8 9.2 5.6 8.9L5 7.6C4.8 7.3 4.9 6.9 5.2 6.7L6.9 5C7.1 4.8 7.5 4.7 7.8 4.9L9.1 5.5C9.4 5.7 9.8 5.7 10.1 5.5L10.5 5.3C10.8 5.1 11 4.8 11 4.5L11.1 2.9C11.1 2.6 11.3 2.3 11.7 2.3H13.5C13.8 2.3 14.1 2.5 14.1 2.9L14.2 4.5C14.2 4.8 14.4 5.1 14.7 5.3L15.1 5.5C15.4 5.7 15.8 5.7 16.1 5.5L17.4 4.9C17.7 4.7 18.1 4.8 18.3 5.1L20 6.8C20.2 7 20.3 7.4 20.1 7.7L19.5 9C19.3 9.3 19.3 9.7 19.5 10L19.7 10.4C19.9 10.7 20.2 10.9 20.5 10.9L22.1 11C22.4 11 22.7 11.2 22.7 11.6V13.4C22.7 13.7 22.5 14 22.1 14L20.5 14.1C20.2 14.1 19.9 14.3 19.7 14.6L19.4 15Z"
            fill={activeTab === 'settings' ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <span>Pengaturan</span>
      </button>
    </nav>
  );
}
