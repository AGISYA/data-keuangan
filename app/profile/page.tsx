"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowRightOnRectangle, HiPencil, HiCamera } from "react-icons/hi2";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });

  // Ambil userId dari localStorage dan fetch data user
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/signin");
        return;
      }

      const res = await fetch(`/api/profile?userId=${userId}`);
      const data = await res.json();
      setUserData(data);
    };

    fetchProfile();
  });

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`/api/profile?userId=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/signin");
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Kelola informasi akun Anda</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userData.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <HiCamera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-gray-600">{userData.company}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Personal */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Informasi Personal
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors"
          >
            <HiPencil className="h-4 w-4" />
            <span>{isEditing ? "Batal" : "Edit"}</span>
          </button>
        </div>
        <div className="p-4 space-y-4">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData[field as keyof typeof userData] || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, [field]: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <div className="text-gray-900">
                  {userData[field as keyof typeof userData]}
                </div>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Simpan Perubahan
            </button>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 hover:text-red-700"
          >
            <HiArrowRightOnRectangle className="inline w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
