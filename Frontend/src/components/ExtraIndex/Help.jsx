import React, { useState } from 'react'
import Nav from '../Index/Nav'
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Help = () => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ حالة جديدة

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const Suggest = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true); // ✅ بداية الإرسال

    try {
      const { data } = await axios.post(`${apiUrl}/submitSuggestion`, {
        type,
        details,
        name: user.Name,
        email: user.Email
      });

      if (data?.error === false) {
        toast.success(`Your ${type} has been submitted successfully`);
        setType("");
        setDetails("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false); // ✅ نهاية الإرسال
    }
  };

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
              value={type}
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
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 border rounded"
              rows="4"
              placeholder="Enter your details here..."
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              onClick={Suggest}
              disabled={isSubmitting}
              className="px-6 py-3 text-white rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: color }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
