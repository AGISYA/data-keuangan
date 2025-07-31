"use client";

import React from "react";

interface FormDataType {
  toko: string;
  items: string;
  harga: string;
  tanggalStruk: string;
  tanggalInput: string;
  waktuInput: string;
}

interface ExpenseModalProps {
  isOpen: boolean;
  editingExpense: boolean;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ExpenseModal({
  isOpen,
  editingExpense,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: ExpenseModalProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 shadow-2xl flex items-center justify-center">
      <div className="bg-gray-100 p-6 rounded-lg w-full max-w-xl space-y-4 shadow-lg relative">
        <h2 className="text-xl font-bold">
          {editingExpense ? "Edit Pengeluaran" : "Tambah Pengeluaran"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="toko" className="text-sm font-medium mb-1">
                Toko
              </label>
              <input
                type="text"
                id="toko"
                name="toko"
                placeholder="Contoh: Indomaret"
                value={formData.toko}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="items" className="text-sm font-medium mb-1">
                Items
              </label>
              <input
                type="text"
                id="items"
                name="items"
                placeholder="Contoh: Mie Instan"
                value={formData.items}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="harga" className="text-sm font-medium mb-1">
                Harga
              </label>
              <input
                type="number"
                id="harga"
                name="harga"
                placeholder="Contoh: 15000"
                value={formData.harga}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="tanggalStruk"
                className="text-sm font-medium mb-1"
              >
                Tanggal Struk
              </label>
              <input
                type="date"
                id="tanggalStruk"
                name="tanggalStruk"
                value={formData.tanggalStruk}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="tanggalInput"
                className="text-sm font-medium mb-1"
              >
                Tanggal Input
              </label>
              <input
                type="date"
                id="tanggalInput"
                name="tanggalInput"
                value={formData.tanggalInput}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="waktuInput" className="text-sm font-medium mb-1">
                Waktu Input
              </label>
              <input
                type="time"
                id="waktuInput"
                name="waktuInput"
                value={formData.waktuInput}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
