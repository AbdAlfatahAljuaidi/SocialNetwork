import React, { useState } from 'react'
import Nav from '../Index/Nav'
import axios from 'axios';
import { toast } from 'react-toastify';

const Help = () => {
    const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

    const [type,setType] = useState("")
    const [details,setDetails] = useState("")

      const [userData, setuserData] = useState(JSON.parse(localStorage.getItem("userData")));


const Suggest = async () => {
try {
  const {data} = await axios.post("http://localhost:4000/submitSuggestion",{
    type,
    details,
    name:userData.Name,
    email:userData.Email
  })
  
  if (data?.error === false) {
    toast.success(`Your ${type} has been submitted successfully`);
  } 
} catch (error) {
  console.log(error);
  toast.error(error.response.data.message)
  
}


}


  return (
    <div>
      <Nav />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Suggestion and Complaint Form</h2>
        <div className="space-y-4">
          {/* Issue type */}
          <div>
            <label htmlFor="type" className="block text-lg font-medium">Issue Type</label>
            <select
              id="type"
              name="type"
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border rounded"
              required
            >
              <option value="">Select Issue Type</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Complaint">Complaint</option>
            </select>
          </div>

          {/* Details */}
          <div>
            <label htmlFor="details" className="block text-lg font-medium">Details</label>
            <textarea
              id="details"
              name="details"
            onChange={(e)=> setDetails(e.target.value)}
              className="w-full p-3 border rounded"
              rows="4"
              placeholder="Enter your details here..."
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <div>
            <button type="submit" className="px-6 py-3  text-white rounded-lg" onClick={()=>Suggest()} style={{
                background:color
              }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
