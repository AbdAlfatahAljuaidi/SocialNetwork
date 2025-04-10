import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OpinionTable = () => {
  const [allOpinions, setAllOpinions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchOpinions() {
      try {
        const { data } = await axios.get("http://localhost:4000/User/Show");
        setAllOpinions(data.Opinions);
      } catch (error) {
        console.log("Error fetching Opinions", error);
      }
    }
    fetchOpinions();
  }, []);

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:4000/deleteOpinion/${id}`);
      if (data.success) {
        const updated = allOpinions.filter(op => op._id !== id);
        setAllOpinions(updated);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error deleting opinion:", error);
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const filteredOpinions = useMemo(() => 
    allOpinions.filter(op =>
      op.Name.toLowerCase().includes(search.toLowerCase()) ||
      op.Email.toLowerCase().includes(search.toLowerCase()) ||
      op.Comment.toLowerCase().includes(search.toLowerCase())
    ), [search, allOpinions]);

  const currentOpinions = filteredOpinions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredOpinions.length / itemsPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOpinions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Opinions");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Opinions.xlsx");
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-4'>
        <h2 className='text-2xl font-bold'>Opinion Data Table</h2>
        <input
          type="text"
          placeholder="Search by name, email, or comment..."
          className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={exportToExcel} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
            Export Excel
          </button>
        </div>
      </div>

      <table id="opinions-table" className='min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 border'>Name</th>
            <th className='px-4 py-2 border'>Email</th>
            <th className='px-4 py-2 border'>Comment</th>
            <th className='px-4 py-2 border'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOpinions.length > 0 ? (
            currentOpinions.map((opinion) => (
              <tr key={opinion._id} className='text-center hover:bg-gray-50'>
                <td className='px-4 py-2 border'>{opinion.Name}</td>
                <td className='px-4 py-2 border'>{opinion.Email}</td>
                <td className='px-4 py-2 border'>{opinion.Comment}</td>
                <td className='px-4 py-2 border'>
                  <button
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                    onClick={() => deleteUser(opinion._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No opinions found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
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

export default OpinionTable;
