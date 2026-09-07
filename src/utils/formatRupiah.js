/**
 * Format angka menjadi mata uang Rupiah Indonesia.
 * @param {number} number - Angka yang akan diformat
 * @returns {string} String terformat, contoh: "Rp150.000"
 */
export function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
}
