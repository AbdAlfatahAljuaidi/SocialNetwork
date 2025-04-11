import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
 

const Edit = () => {

    const [Age, setAge] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [Gender, setGender] = useState("");
    const [postImage, setPostImage] = useState("");
    const [major, setMajor] = useState("");
    const [username, setUsername] = useState("");

 
    const navigate = useNavigate()
    const params = useParams();

    const user = JSON.parse(localStorage.getItem("user"));
    const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");



    useEffect(() => {
      async function sendReq() {
     
        
        const { data } = await axios.get(
          `http://localhost:4000/GetDataProfile/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

     
        
      
        setAge(data.personalInfo.Age);
        setAddress(data.personalInfo.Address);
        setPhone(data.personalInfo.Phone);
        setGender(data.personalInfo.Gender);
        setMajor(data.personalInfo.major);
        setUsername(user.Name);
     
    
      
      }
      sendReq();
    }, []);
   

    async function submitForm() {
      try {
        const formData = new FormData();
        formData.append("userID", user._id);
        formData.append("Age", Age);
        formData.append("Address", Address);
        formData.append("Phone", Phone);
        formData.append("Gender", Gender);
        formData.append("username", username);
        formData.append("major", major);
        formData.append("file", postImage); // تأكد أن "file" هو الاسم المستخدم في `multer.single("file")`

        console.log(postImage);
        
    
        const { data } = await axios.put(
          `http://localhost:4000/SetDataProfile/${params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
    
        if (data.message === "Update Data Successfully") {
          toast.success(data.message);
          navigate(`/Index/Profile`);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response?.data?.message || "حدث خطأ غير متوقع");
      }
    }
    
    

  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Update Profile</h2>
        <div className="space-y-6">


        <div>
            <label htmlFor="type" className="block text-lg font-medium">Major</label>
            <select
              onChange={(e) => setMajor(e.target.value)}
              className="w-full p-3 border rounded"
              required
              name="major"
              value={major}  
            >
              <option value="">Select major</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Law">Law</option>
            </select>
          </div>


          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Age
            </label>
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              name="Age"
              placeholder='25'
              value={Age}            
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              name="Address"
              value={Address}   
           placeholder='New York '
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Faculty */}
          <div>
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              name="Phone"
              value={Phone}   
            placeholder='+123 344 676'
              className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

       





          <div>
            <label htmlFor="type" className="block text-lg font-medium">Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded"
              required
              name="Gender"
              value={Gender}  
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>







            <div>
          <input
          type="file"
          accept="image/*"
          onChange={(e) => {

            
            const file = e.target.files[0];
            console.log('تم اختيار الملف:', file);
            setPostImage(file); // تخزين الصورة المحددة
          }}
          className="mb-2"
        />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
           onClick={submitForm}
              className="px-6 py-2  text-white rounded-lg transition duration-200"
              style={{
                background:color
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
