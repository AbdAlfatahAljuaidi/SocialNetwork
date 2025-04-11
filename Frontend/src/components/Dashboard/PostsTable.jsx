import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const PostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // يمكنك تعديل العدد هنا حسب حاجتك

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البوستات:', error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => 
    posts.filter(post =>
      post.text.toLowerCase().includes(search.toLowerCase()) ||
      post.imageUrl.toLowerCase().includes(search.toLowerCase())
    ), [search, posts]);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPosts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Posts");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Posts.xlsx");
  };

  const deletePost = async (postid) => {
    try {
      const { data } = await axios.post(`${apiUrl}/deletePost`, { postid });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postid));
      toast.success(data.message);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-4'>
        <h2 className='text-2xl font-bold'>Posts Table</h2>

        {/* عرض العدد الإجمالي للبوستات */}
        <div className='text-sm text-gray-600'>
          <strong>Total Posts: </strong> {filteredPosts.length}
        </div>

        <input
          type="text"
          placeholder="Search by content or link..."
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
            <th className='px-4 py-2 border'>Profile Image</th>
            <th className='px-4 py-2 border'>Content</th>
            <th className='px-4 py-2 border'>Image</th>
            <th className='px-4 py-2 border'>Likes</th>
            <th className='px-4 py-2 border'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <tr key={post._id} className='text-center hover:bg-gray-50'>
                <td className='px-4 py-2 border'>{post.username}</td>
                <td className='px-4 py-2 border'>
                  <img src={post.ProfileImage} className='w-10 h-10' alt="" />
                </td>
                <td className='px-4 py-2 border'>{post.text}</td>
                <td className='px-4 py-2 border'>
                  <img src={post.imageUrl} className='w-10 h-10' alt="" />
                </td>
                <td className='px-4 py-2 border'>{post.likes}</td>
                <td className='px-4 py-2 border'>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No posts found.</td>
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

export default PostsTable;
