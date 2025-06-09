import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

import { useTranslation } from 'react-i18next';
const Update = ({changeLanguage}) => {
  const [Age, setAge] = useState();
  const [Address, setAddress] = useState("");
  const [Phone, setPhone] = useState();
  const [Gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [year, setYear] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [point, setPoint] = useState(0);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [color, setColor] = useState(localStorage.getItem("mainColor") || "#1D4ED8");

  
  const { t } = useTranslation();
  const AddInfo = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const ageNumber = parseInt(Age);
    if (isNaN(ageNumber) || ageNumber < 10 || ageNumber > 99) {
      toast.error("Age must be between 10 and 99");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userID", user._id);
      formData.append("Age", Age);
      formData.append("Address", Address);
      formData.append("Phone", Phone);
      formData.append("Gender", Gender);
      formData.append("major", major);
      formData.append("username", user.Name);
      formData.append("year", year);
      formData.append("point", point);
      formData.append("file", postImage);

      const { data } = await axios.post(`${apiUrl}/User/Profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.error === false) {
        let userData = JSON.parse(localStorage.getItem('user')) || {};
        userData.profileImage = data.profileImage;
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success("The data added successfully");
        navigate('/Index/Profile');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl space-y-6">
        <div className="flex flex-col items-center">
          {user?.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4 shadow-lg"
            />
          )}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('updateProfile')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('majorf')}</label>
            <select
              onChange={(e) => setMajor(e.target.value)}
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">{t('selectMajor')}</option>
              <option value="Special Education">{t("major.specialEducation")}</option>
<option value="Business Administration">{t("major.businessAdministration")}</option>
<option value="Counseling Psychology And Mental Health">{t("major.counselingPsychology")}</option>
<option value="Educational Administration And Curriculum">{t("major.educationalAdmin")}</option>
<option value="Accounting">{t("major.accounting")}</option>
<option value="Management Information Systems">{t("major.mis")}</option>
<option value="Digital Marketing">{t("major.digitalMarketing")}</option>
<option value="Accounting And Business Law">{t("major.accountingBusinessLaw")}</option>
<option value="Data Science And Artificial Intelligence">{t("major.dataScienceAI")}</option>
<option value="Software Engineering">{t("major.softwareEngineering")}</option>
<option value="Cybersecurity">{t("major.cybersecurity")}</option>
<option value="Computer Science">{t("major.computerScience")}</option>
<option value="English Language And Translation">{t("major.englishTranslation")}</option>
<option value="Arabic Language And Literature">{t("major.arabicLiterature")}</option>
<option value="Jurisprudence And Its Principles">{t("major.jurisprudence")}</option>
<option value="Aircraft Maintenance">{t("major.aircraftMaintenance")}</option>
<option value="Aviation Electronics Engineering">{t("major.aviationElectronics")}</option>
<option value="Architectural Engineering">{t("major.architecturalEngineering")}</option>
<option value="Civil Engineering">{t("major.civilEngineering")}</option>
<option value="Electrical Engineering">{t("major.electricalEngineering")}</option>
<option value="Mechatronics Engineering">{t("major.mechatronicsEngineering")}</option>
<option value="Biomedical Engineering">{t("major.biomedicalEngineering")}</option>
<option value="Industrial Engineering">{t("major.industrialEngineering")}</option>



            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('age')}</label>
            <input
              type="number"
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('address')}</label>
  <select
    onChange={(e) => setAddress(e.target.value)}
    className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  >
    <option value="">{t('selectRegion')}</option>
    <option value="Amman">{t("city.amman")}</option>
<option value="Zarqa">{t("city.zarqa")}</option>
<option value="Irbid">{t("city.irbid")}</option>
<option value="Aqaba">{t("city.aqaba")}</option>
<option value="Salt">{t("city.salt")}</option>
<option value="Mafraq">{t("city.mafraq")}</option>
<option value="Karak">{t("city.karak")}</option>
<option value="Tafilah">{t("city.tafilah")}</option>
<option value="Ma'an">{t("city.maan")}</option>
<option value="Jerash">{t("city.jerash")}</option>
<option value="Ajloun">{t("city.ajloun")}</option>
<option value="Madaba">{t("city.madaba")}</option>
<option value="Balqa">{t("city.balqa")}</option>

  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('phone')}</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123 344 676"
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('year')}</label>
            <input
              type="number"
              onChange={(e) => setYear(e.target.value)}
              placeholder="2025"
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('gender')}</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">{t('selectGender')}</option>
              <option value="Male">{t('male')}</option>
              <option value="Female">{t('female')}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('uploadImage')}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setPostImage(file);
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={AddInfo}
            disabled={isSubmitting}
            className="px-8 py-3 font-semibold text-white rounded-lg shadow-lg hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: color }}
          >
            {isSubmitting ? t('saving') : t('saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
