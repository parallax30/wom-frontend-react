"use client";

import { useEffect, useState } from "react";
import { FaCheckSquare, FaTrashAlt, FaBan } from "react-icons/fa";
import { getUsers, putUser } from "@/services/apiService";

/* =====================
   TIPOS
===================== */

interface UserRow {
  id: number;
  name: string;
  email: string;
  status: "Activo" | "Pendiente Validación" | "Desactivado";
}

interface StrapiUser {
  id: number;
  email: string;
  name?: string;
  lastName?: string;
  confirmed: boolean;
  blocked: boolean;
}

/* =====================
   HELPERS
===================== */

const mapStatus = (user: StrapiUser): UserRow["status"] => {
  if (user.blocked) return "Desactivado";
  if (!user.confirmed) return "Pendiente Validación";
  return "Activo";
};

/* =====================
   COMPONENT
===================== */

export default function UserAdmin() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<null | {
    id: number;
    type: "approve" | "block" | "delete";
  }>(null);

  // Sorting
  const [sortColumn, setSortColumn] = useState<null | keyof UserRow>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  /* =====================
     FETCH USERS
  ===================== */

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers({});
      const users: StrapiUser[] = response?.data || [];

      console.log("Fetched users:", users);

      const mapped: UserRow[] = users.map((u) => ({
        id: u.id,
        name: `${u.name ?? ""} ${u.lastName ?? ""}`.trim(),
        email: u.email,
        status: mapStatus(u),
      }));

      setUsers(mapped);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =====================
     SORTING
  ===================== */

  const handleSort = (column: keyof UserRow | "actions") => {
    if (column === "actions") return;

    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortColumn) return 0;

    const aVal = String(a[sortColumn]).toLowerCase();
    const bVal = String(b[sortColumn]).toLowerCase();

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  /* =====================
     ACTIONS
  ===================== */

  const confirmAction = (id: number, type: "approve" | "block" | "delete") => {
    setSelectedAction({ id, type });
    setModalOpen(true);
  };

  const executeConfirmedAction = async () => {
    if (!selectedAction) return;

    const { id, type } = selectedAction;

    try {
      if (type === "delete") {
        await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        );
      } else {
        const isBlocked = (type === "block" ? true : false);

        await putUser(id, { blocked: isBlocked});
      }

      //envío correo notificando al usuario
      const res1 = await fetch(`${process.env.NEXT_PUBLIC_HELPER_API}/email/${type}`, {
      
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Internal-Token": process.env.NEXT_PUBLIC_HELPER_API_TOKEN!,
        },
        body: JSON.stringify({
          userId: id
        }),
      });
        

      const data = await res1.json();
      if (!res1.ok) {
        console.error("Error en send mail:", data);
        //throw new Error(data?.error?.message || "Confirm OTP failed");
      }

      await fetchUsers();
    
    } catch (error) {
      console.error("Action failed", error);
    } finally {
      setModalOpen(false);
      setSelectedAction(null);
    }
  };

  /* =====================
     UI HELPERS
  ===================== */

  const getColorLabel = (status: UserRow["status"]) => {
    switch (status) {
      case "Activo":
        return <span className="text-green-600 text-xs font-bold">Activo</span>;
      case "Pendiente Validación":
        return (
          <span className="text-yellow-500 text-xs font-bold">
            Pendiente Validación
          </span>
        );
      case "Desactivado":
        return <span className="text-red-600 text-xs font-bold">Desactivado</span>;
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="w-full px-6 py-10 mt-20">
      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#2D1540]">
          User Administration
        </h1>

        <div className="overflow-hidden border border-gray-300 rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-800 text-white text-left text-sm">
                {[
                  { key: "name", label: "User Name" },
                  { key: "email", label: "User Email" },
                  { key: "status", label: "State" },
                  { key: "actions", label: "Actions" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className={`py-3 px-4 ${
                      col.key !== "actions" ? "cursor-pointer" : ""
                    }`}
                    onClick={() => handleSort(col.key as any)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortColumn === col.key && (
                        <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedUsers.map((u, idx) => (
                <tr
                  key={u.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">{getColorLabel(u.status)}</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => confirmAction(u.id, "approve")}
                        title="Approve"
                      >
                        <FaCheckSquare size={20} />
                      </button>

                      <button
                        onClick={() => confirmAction(u.id, "block")}
                        title="Block"
                      >
                        <FaBan size={20} />
                      </button>

                      <button
                        onClick={() => confirmAction(u.id, "delete")}
                        title="Delete"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[350px]">
            <h2 className="text-xl font-bold mb-4">Confirm action</h2>

            <p className="mb-6 text-sm">
              Are you sure you want to <b>{selectedAction?.type}</b> this user?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={executeConfirmedAction}
                className="px-4 py-2 bg-purple-700 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
