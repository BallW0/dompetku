import { useState, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

/**
 * Custom hook yang mengelola semua logic transaksi:
 * - CRUD (create, delete)
 * - Computed values (income, expense, balance)
 * - Export/Import JSON
 */
export function useTransactions() {
  const transactions =
    useLiveQuery(() =>
      db.transactions.orderBy('createdAt').reverse().toArray()
    ) || [];

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const addTransaction = useCallback(async ({ title, amount, type, category }) => {
    await db.transactions.add({
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString('id-ID'),
      createdAt: Date.now(),
    });
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    await db.transactions.delete(id);
  }, []);

  const exportJSON = useCallback(() => {
    if (transactions.length === 0) return false;
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(transactions, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute('href', dataStr);
    anchor.setAttribute('download', `backup_dompetku_${Date.now()}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    return true;
  }, [transactions]);

  const importJSON = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = async (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (Array.isArray(data)) {
            await db.transactions.clear();
            await db.transactions.bulkAdd(data);
            resolve(data.length);
          } else {
            reject(new Error('Format tidak valid'));
          }
        } catch {
          reject(new Error('File JSON rusak atau tidak valid'));
        }
      };
      reader.onerror = () => reject(new Error('Gagal membaca file'));
    });
  }, []);

  return {
    transactions,
    income,
    expense,
    balance,
    addTransaction,
    deleteTransaction,
    exportJSON,
    importJSON,
  };
}
