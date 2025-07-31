"use client";

import { HiCalendarDays, HiArrowTrendingDown } from "react-icons/hi2";

export default function DashboardPage() {
  // Data dummy pengeluaran - bisa diganti dengan data dari API
  const todayTotal = 700000;
  const monthTotal = 12500000;
  const yearTotal = 85000000;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Pengeluaran
        </h1>
        <p className="text-gray-600 mt-2">Ringkasan data pengeluaran Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4">
        {/* Total Hari Ini */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md">
          <div className="flex items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium opacity-90">
              Pengeluaran Hari Ini
            </h3>
            <HiCalendarDays className="h-4 w-4 opacity-90" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {formatCurrency(todayTotal)}
            </div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <HiArrowTrendingDown className="h-3 w-3 mr-1" />
              +5% dari kemarin
            </div>
          </div>
        </div>

        {/* Total Bulan Ini */}
        <div className="bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg shadow-md">
          <div className="flex items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium opacity-90">
              Pengeluaran Bulan Ini
            </h3>
            <HiCalendarDays className="h-4 w-4 opacity-90" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {formatCurrency(monthTotal)}
            </div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <HiArrowTrendingDown className="h-3 w-3 mr-1" />
              +10% dari bulan lalu
            </div>
          </div>
        </div>

        {/* Total Tahun Ini */}
        <div className="bg-gradient-to-r from-red-300 to-red-400 text-white rounded-lg shadow-md">
          <div className="flex items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium opacity-90">
              Pengeluaran Tahun Ini
            </h3>
            <HiCalendarDays className="h-4 w-4 opacity-90" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {formatCurrency(yearTotal)}
            </div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <HiArrowTrendingDown className="h-3 w-3 mr-1" />
              +20% dari tahun lalu
            </div>
          </div>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Pengeluaran Terbaru
          </h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Pembelian Bahan Baku</p>
                  <p className="text-xs text-gray-500">2 jam yang lalu</p>
                </div>
              </div>
              <span className="text-red-600 font-medium">
                -{formatCurrency(200000)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Transportasi</p>
                  <p className="text-xs text-gray-500">3 jam yang lalu</p>
                </div>
              </div>
              <span className="text-red-600 font-medium">
                -{formatCurrency(150000)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Makan Siang Karyawan</p>
                  <p className="text-xs text-gray-500">4 jam yang lalu</p>
                </div>
              </div>
              <span className="text-red-600 font-medium">
                -{formatCurrency(350000)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
