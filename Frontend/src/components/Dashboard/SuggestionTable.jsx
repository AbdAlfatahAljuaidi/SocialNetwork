import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const SuggestionTable = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestionsPerPage] = useState(4); // عدد العناصر في كل صفحة

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const { data } = await axios.get(`${apiUrl}/getSuggestions`);
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
        toast.error("Failed to load suggestions");
      }
    }

    fetchSuggestions();
  }, []);

  const deleteSuggestion = async (id) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/deleteSuggestion/${id}`);
      if (data.success) {
        setSuggestions(prev => prev.filter(s => s._id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting suggestion:", error);
      toast.error("Failed to delete suggestion");
    }
  };





  const filteredSuggestions = suggestions.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.type?.toLowerCase().includes(search.toLowerCase()) ||
    s.details?.toLowerCase().includes(search.toLowerCase())
  );

  // حساب الفهرس الأول والآخر للعناصر في الصفحة الحالية
  const indexOfLastSuggestion = currentPage * suggestionsPerPage;
  const indexOfFirstSuggestion = indexOfLastSuggestion - suggestionsPerPage;
  const currentSuggestions = filteredSuggestions.slice(indexOfFirstSuggestion, indexOfLastSuggestion);

  // حساب إجمالي عدد الصفحات
  const totalPages = Math.ceil(filteredSuggestions.length / suggestionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSuggestions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Suggestions");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Suggestions.xlsx");
  };


  

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mt-10 mb-4'>
        <h2 className='text-2xl font-bold'>Suggestions / Complaints Table</h2>
        
        {/* Show total suggestions count */}
        <div className='text-sm text-gray-600'>
          <strong>Total Suggestions: </strong> {filteredSuggestions.length}
        </div>

        <input
          type="text"
          placeholder="Search..."
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

      <table className='min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 border'>Name</th>
            <th className='px-4 py-2 border'>Email</th>
            <th className='px-4 py-2 border'>Type</th>
            <th className='px-4 py-2 border'>Title</th>
            <th className='px-4 py-2 border'>Details</th>
            <th className='px-4 py-2 border'>Status</th>
            <th className='px-4 py-2 border'>Date</th>
            <th className='px-4 py-2 border'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentSuggestions.length > 0 ? (
            currentSuggestions.map((sug) => (
              <tr key={sug._id} className='text-center hover:bg-gray-50'>
                <td className='px-4 py-2 border'>{sug.name}</td>
                <td className='px-4 py-2 border'>{sug.email}</td>
                <td className='px-4 py-2 border'>{sug.type}</td>
                <td className='px-4 py-2 border'>{sug.title}</td>
                <td className='px-4 py-2 border'>{sug.details}</td>
                <td className='px-4 py-2 border'>{sug.state}</td>
                <td className='px-4 py-2 border'>{new Date(sug.createdAt).toLocaleString()}</td>
                <td className='px-4 py-2 border gap-2'>
                  <button
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                    onClick={() => deleteSuggestion(sug._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/UpdateSuggest/${sug._id}`}>
                  <button
                    className='bg-green-500 ml-2 text-white px-3 py-1 rounded hover:bg-green-600'
                  >
                    Update
                  </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No suggestions found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
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

export default SuggestionTable;
