import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const ProfileTable = () => {
  const [allProfile, setAllProfile] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(8); // عدد العناصر في كل صفحة

  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get(`${apiUrl}/getAllProfile`);
        setAllProfile(data.usersProfile);
      } catch (error) {
        console.log("Error fetching profiles:", error);
      }
    }
    sendReq();
  }, []);

  const deleteProfile = async (profileId) => {
    try {
      const { data } = await axios.post(`${apiUrl}/deleteProfile`, {
        profileId,
      });

      if (data.message === "Profile deleted successfully") {
        toast.success(data.message);
        // تحديث قائمة البروفايلات بعد الحذف
        setAllProfile(prevProfiles => prevProfiles.filter(profile => profile._id !== profileId));
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete profile. Please try again.');
    }
  };

  const filteredProfiles = allProfile.filter(profile =>
    profile.Age.toString().includes(search) ||
    profile.Address.toLowerCase().includes(search.toLowerCase()) ||
    profile.Phone.toLowerCase().includes(search.toLowerCase()) ||
    profile.Gender.toLowerCase().includes(search.toLowerCase())
  );

  // حساب الفهرس الأول والآخر للعناصر في الصفحة الحالية
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  // حساب إجمالي عدد الصفحات
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredProfiles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profiles");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Profiles.xlsx");
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-4'>
        <h2 className='text-2xl font-bold'>Profile Table</h2>
        
        {/* Show total profiles count */}
        <div className='text-sm text-gray-600'>
          <strong>Total Profiles: </strong> {filteredProfiles.length}
        </div>

        <input
          type="text"
          placeholder="Search by any field..."
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
            <th className='px-4 py-2 border'>Age</th>
            <th className='px-4 py-2 border'>Address</th>
            <th className='px-4 py-2 border'>Phone</th>
            <th className='px-4 py-2 border'>Gender</th>
            <th className='px-4 py-2 border'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProfiles.length > 0 ? (
            currentProfiles.map((profile) => (
              <tr key={profile._id} className='text-center hover:bg-gray-50'>
                <td className='px-4 py-2 border'>{profile.Age}</td>
                <td className='px-4 py-2 border'>{profile.Address}</td>
                <td className='px-4 py-2 border'>{profile.Phone}</td>
                <td className='px-4 py-2 border'>{profile.Gender}</td>
                <td className='px-4 py-2 border'>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteProfile(profile._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No profiles found.</td>
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

export default ProfileTable;
