import React, { useState } from 'react'
import Nav from '../Index/Nav'
import axios from 'axios';
import { toast } from 'react-toastify';

import { useTranslation } from "react-i18next"; // ✅ إضافة i18n
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Help = ({changeLanguage}) => {
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [state, setstate] = useState("Pending");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ حالة جديدة

  const { t } = useTranslation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const Suggest = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true); // ✅ بداية الإرسال

    try {
      const { data } = await axios.post(`${apiUrl}/submitSuggestion`, {
        type,
        details,
        name: user.Name,
        email: user.Email,
        state,
        title,
      });

      if (data?.error === false) {
        toast.success(`Your ${type} has been submitted successfully`);
        setType("");
        setDetails("");
        setTitle("");
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
        <h2 className="text-2xl font-semibold mb-4">{t('suggestion_complaint_form')}</h2>
        <div className="space-y-4">
          {/* Issue type */}
          <div>
            <label htmlFor="type" className="block text-lg font-medium">{t('issue_type')}</label>
            <select
              id="type"
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="w-full p-3 border rounded"
              required
            >
              <option value="">{t('select_issue_type')}</option>
              <option value="Suggestion">{t('suggestion')}</option>
              <option value="Complaint">{t('complaint')}</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium">{t('title')}</label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded"
              rows="4"
              placeholder={t('enter_title_here')}
              required
            />
          </div>

          {/* Details */}
          <div>
            <label htmlFor="details" className="block text-lg font-medium">{t('details')}</label>
            <textarea
              id="details"
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-3 border rounded"
              rows="4"
              placeholder={t('enter_details_here')}
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
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
