import { useState, useEffect, useCallback } from 'react';

/**
 * Toast notification component — pengganti alert() bawaan browser.
 * Menampilkan pesan dari atas layar dengan auto-dismiss.
 */

// Singleton event bus untuk trigger toast dari mana saja
const listeners = new Set();

export function showToast(message, type = 'success') {
  listeners.forEach((fn) => fn({ message, type, id: Date.now() }));
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3000);
  }, []);

  useEffect(() => {
    listeners.add(addToast);
    return () => listeners.delete(addToast);
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
