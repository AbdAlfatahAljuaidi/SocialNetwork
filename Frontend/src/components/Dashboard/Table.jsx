import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Table = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7); // يمكنك تعديل العدد هنا

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await axios.get(`${apiUrl}/Index/Users`);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/Index/Users/Delete/${id}`);
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.Name.toLowerCase().includes(search.toLowerCase()) ||
    u.Email.toLowerCase().includes(search.toLowerCase())
  );

  // حساب الصفحات المعروضة
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // ✅ Export Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Users.xlsx");
  };

  // ✅ Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Users Table", 14, 10);
    const tableColumn = ["Name", "Email"];
    const tableRows = filteredUsers.map(user => [user.Name, user.Email]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("Users.pdf");
  };



  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">User Data Table</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={exportToExcel} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">Export Excel</button>
          <button onClick={exportToPDF} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">Export PDF</button>
        </div>
      </div>

      {/* Displaying the total number of filtered users */}
      <div className="mb-4 text-gray-700 font-medium">
        <p>{filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found</p>
      </div>

      <table className="min-w-full border border-gray-300 shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Active</th>
            <th className="px-4 py-2 border">Admin</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user._id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{user.Name}</td>
                <td className="px-4 py-2 border">{user.Email}</td>
                <td className="px-4 py-2 border">{user.active ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border">{user.admin ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 text-white px-3 ml-3 py-1 w-20 rounded hover:bg-red-600"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/EditUser/${user._id}`}>
                    <button className="ml-3 bg-green-500 text-white w-20 px-3 py-1 mt-1 md:mt-0 rounded hover:bg-green-600">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center gap-5 items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-3 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-3 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
