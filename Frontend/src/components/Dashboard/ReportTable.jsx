import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const ReportTable = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(7);

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data } = await axios.get(`${apiUrl}/getReports`);
        setReports(data.reports); // تأكد من أن الـ API يعيد reports
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    fetchReports();
  }, []);

  const deleteReport = async (id) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/deleteReport/${id}`);
      if (data.success) {
        setReports((prev) => prev.filter((r) => r._id !== id));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredReports = reports.filter((r) =>
    r.reporter.toLowerCase().includes(search.toLowerCase()) ||
    r.reportedUser.toLowerCase().includes(search.toLowerCase()) ||
    r.reason.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredReports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Reports.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Reports Table", 14, 10);
    const tableColumn = ["Reporter", "Reported User", "Reason"];
    const tableRows = filteredReports.map(r => [r.reporter, r.reportedUser, r.reason]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("Reports.pdf");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">Reports Table</h2>
        <input
          type="text"
          placeholder="Search by reporter, reported user, or reason..."
          className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={exportToExcel} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">Export Excel</button>
          <button onClick={exportToPDF} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">Export PDF</button>
        </div>
      </div>

      <div className="mb-4 text-gray-700 font-medium">
        <p>{filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} found</p>
      </div>

      <table className="min-w-full border border-gray-300 shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Reporter</th>
            <th className="px-4 py-2 border">Reported User</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.length > 0 ? (
            currentReports.map((r) => (
              <tr key={r._id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{r.reporter}</td>
                <td className="px-4 py-2 border">{r.reportedUser}</td>
                <td className="px-4 py-2 border">{r.reason}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteReport(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No reports found.</td>
            </tr>
          )}
        </tbody>
      </table>

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

export default ReportTable;
