"use client";

import { useEffect, useState } from "react";
import {
  HiMagnifyingGlass,
  HiPlus,
  HiPencilSquare,
  HiTrash,
} from "react-icons/hi2";
import ExpenseModal from "@/components/ExpenseModal";

interface Expense {
  id: string;
  store: string;
  items: string;
  price: number;
  receiptDate: string;
  inputDate: string;
  inputTime: string;
}

interface FormDataType {
  toko: string;
  items: string;
  harga: string;
  tanggalStruk: string;
  tanggalInput: string;
  waktuInput: string;
}

// 🔧 Format tanggal ke format Indonesia
function formatDateIndo(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // ⬅️ Tambahkan state untuk search
  const [formData, setFormData] = useState<FormDataType>({
    toko: "",
    items: "",
    harga: "",
    tanggalStruk: "",
    tanggalInput: "",
    waktuInput: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expenseData = {
      store: formData.toko,
      items: formData.items,
      price: parseInt(formData.harga),
      receiptDate: formData.tanggalStruk,
      inputDate: formData.tanggalInput,
      inputTime: formData.waktuInput,
    };

    try {
      if (editingExpense) {
        const res = await fetch(`/api/expenses/${editingExpense.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData),
        });
        const updated = await res.json();
        setExpenses((prev) =>
          prev.map((ex) => (ex.id === updated.id ? updated : ex))
        );
      } else {
        const res = await fetch("/api/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData),
        });
        const added = await res.json();
        setExpenses((prev) => [added, ...prev]);
      }
    } catch (err) {
      console.error("Gagal menghapus data:", err);

      alert("Terjadi kesalahan saat menyimpan data.");
    }

    setIsOpen(false);
    setEditingExpense(null);
    setFormData({
      toko: "",
      items: "",
      harga: "",
      tanggalStruk: "",
      tanggalInput: "",
      waktuInput: "",
    });
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      toko: expense.store,
      items: expense.items,
      harga: expense.price.toString(),
      tanggalStruk: expense.receiptDate,
      tanggalInput: expense.inputDate,
      waktuInput: expense.inputTime,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengeluaran ini?")) return;

    try {
      await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      setExpenses((prev) => prev.filter((ex) => ex.id !== id));
    } catch (err) {
      console.error("Gagal menghapus data:", err);
      alert("Gagal menghapus data.");
    }
  };

  // 🔍 Filter berdasarkan query pencarian
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <HiMagnifyingGlass className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pengeluaran..."
            className="pl-10 pr-4 py-2 rounded border border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // ✅ Update query saat diketik
          />
        </div>
        <button
          onClick={() => {
            setEditingExpense(null);
            setFormData({
              toko: "",
              items: "",
              harga: "",
              tanggalStruk: "",
              tanggalInput: "",
              waktuInput: "",
            });
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <HiPlus /> Tambah
        </button>
      </div>

      {/* ✅ Komponen Modal Input */}
      <ExpenseModal
        isOpen={isOpen}
        editingExpense={!!editingExpense}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setIsOpen(false);
          setEditingExpense(null);
        }}
        onSubmit={handleSubmit}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Toko</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Harga</th>
              <th className="p-2 border">Tanggal Struk</th>
              <th className="p-2 border">Tanggal Input</th>
              <th className="p-2 border">Waktu Input</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="text-center">
                <td className="p-2 border">{expense.store}</td>
                <td className="p-2 border">{expense.items}</td>
                <td className="p-2 border">
                  Rp{expense.price.toLocaleString()}
                </td>
                <td className="p-2 border">
                  {formatDateIndo(expense.receiptDate)}
                </td>
                <td className="p-2 border">
                  {formatDateIndo(expense.inputDate)}
                </td>
                <td className="p-2 border">{expense.inputTime}</td>
                <td className="p-2 border">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="text-blue-600 hover:underline"
                    >
                      <HiPencilSquare />
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:underline"
                    >
                      <HiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
