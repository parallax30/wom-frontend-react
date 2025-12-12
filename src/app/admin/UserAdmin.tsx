"use client";

import { useEffect, useState } from "react";
import { FaCheckSquare, FaTrashAlt, FaBan } from "react-icons/fa";

interface UserRow {
  id: number;
  name: string;
  email: string;
  status: "Activo" | "Pendiente Autorización" | "Pendiente Validación" | "Desactivado";
}

const mockUsers: UserRow[] = [
  { id: 1, name: "Giacomo Gullizzoni", email: "ggullizzoni@gmail.com", status: "Activo" },
  { id: 2, name: "Marco Botton", email: "mbotton@gmail.com", status: "Pendiente Autorización" },
  { id: 3, name: "Mariah Maclachlan", email: "mmaclachlan@gmail.com", status: "Pendiente Validación" },
  { id: 4, name: "Valerie Liberty", email: "vliberty@gmail.com", status: "Desactivado" },
];

export default function UserAdmin() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<null | {
    id: number;
    type: "approve" | "block" | "delete";
  }>(null);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<null | keyof UserRow>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // ---- Fetch inicial ----
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));

    // TEMPORAL: mock hasta que tengas el API funcionando
    setUsers(mockUsers);
  }, []);

  // ---- Ordenamiento ----
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

  // ---- Acciones CRUD ----
  const confirmAction = (id: number, type: "approve" | "block" | "delete") => {
    setSelectedAction({ id, type });
    setModalOpen(true);
  };

  const executeConfirmedAction = async () => {
    if (!selectedAction) return;

    const { id, type } = selectedAction;

    if (type === "delete") {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/users/${id}/${type}`, { method: "PUT" });
    }

    const refreshed = await fetch("/api/users").then((r) => r.json());
    setUsers(refreshed);

    setModalOpen(false);
    setSelectedAction(null);
  };

  // ---- Colores de estado ----
  const getColorLabel = (status: UserRow["status"]) => {
    switch (status) {
      case "Activo":
        return <span className="text-green-600 text-xs font-bold">Activo</span>;
      case "Pendiente Autorización":
        return <span className="text-yellow-500 text-xs font-bold">Pendiente Autorización</span>;
      case "Pendiente Validación":
        return <span className="text-green-600 text-xs font-bold">Pendiente Validación</span>;
      case "Desactivado":
        return <span className="text-red-600 text-xs font-bold">Desactivado</span>;
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="w-full px-6 py-10 mt-20">

      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#2D1540]">User Administration</h1>

        <div className="overflow-hidden border border-gray-300 rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-800 text-white text-left text-sm">

                {[
                  { key: "name", label: "User Name" },
                  { key: "email", label: "User Email" },
                  { key: "status", label: "Slate" },
                  { key: "actions", label: "Actions" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className={`py-3 px-4 select-none ${
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
                <tr key={u.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">{getColorLabel(u.status)}</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">

                      <button
                        onClick={() => confirmAction(u.id, "approve")}
                        className="text-gray-700 hover:text-green-600"
                        title="Approve"
                      >
                        <FaCheckSquare size={22} />
                      </button>

                      <button
                        onClick={() => confirmAction(u.id, "block")}
                        className="text-gray-700 hover:text-yellow-600"
                        title="Block"
                      >
                        <FaBan size={22} />
                      </button>

                      <button
                        onClick={() => confirmAction(u.id, "delete")}
                        className="text-gray-700 hover:text-red-600"
                        title="Delete"
                      >
                        <FaTrashAlt size={22} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- MODAL DE CONFIRMACIÓN ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[350px]">

            <h2 className="text-xl font-bold mb-4 text-[#2D1540]">Confirmar acción</h2>

            <p className="mb-6 text-sm text-gray-700">
              ¿Estás seguro que deseas{" "}
              <span className="font-bold">
                {
                  selectedAction?.type === "approve"
                    ? "aprobar este usuario"
                    : selectedAction?.type === "block"
                    ? "bloquear este usuario"
                    : "eliminar este usuario"
                }
              </span>
              ?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={executeConfirmedAction}
                className="px-4 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800"
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
