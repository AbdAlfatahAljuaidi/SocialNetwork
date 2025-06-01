import {
  FaUserShield,
  FaClipboardList,
  FaLock,
  FaUserEdit,
  FaExternalLinkAlt,
  FaEnvelopeOpenText,
  FaArrowLeft,
  FaUniversity,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const policies = [
  {
    icon: <FaUserShield className="text-indigo-600 w-8 h-8" />,
    title: "1. Information We Collect",
    bullets: [
      "Personal details (name, email, profile info).",
      "User-generated content (questions, answers, comments).",
      "Technical data (IP address, browser info, device type).",
    ],
  },
  {
    icon: <FaClipboardList className="text-green-600 w-8 h-8" />,
    title: "2. How We Use Your Information",
    bullets: [
      "Match users for educational support.",
      "Improve platform performance and experience.",
      "Analyze user behavior for insights and enhancements.",
    ],
  },
  {
    icon: <FaLock className="text-red-500 w-8 h-8" />,
    title: "3. Data Security",
    bullets: [
      "All data is encrypted during storage and transmission.",
      "Only authorized personnel have access to your information.",
      "Regular system audits and vulnerability checks are conducted.",
    ],
  },
  {
    icon: <FaUserEdit className="text-yellow-500 w-8 h-8" />,
    title: "4. Your Rights",
    bullets: [
      "Access or modify your data anytime.",
      "Request data deletion at your convenience.",
      "Download a copy of your stored information.",
    ],
  },
  {
    icon: <FaExternalLinkAlt className="text-blue-500 w-8 h-8" />,
    title: "5. Third-Party Services",
    bullets: [
      "Some features may use external services (e.g. authentication).",
      "Each third party has its own privacy terms.",
      "We advise reading third-party policies before use.",
    ],
  },
  {
    icon: <FaEnvelopeOpenText className="text-purple-600 w-8 h-8" />,
    title: "6. Contact Us",
    bullets: [
      "For questions or concerns, contact our support team.",
      "Email: support@askaau.com",
    ],
  },
];

export default function PrivacyPolicy({changeLanguage}) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-8" >
      {/* Header / Logo */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2">
          <FaUniversity className="text-indigo-700 w-8 h-8" />
          <span className="text-2xl font-bold text-indigo-800">ASK Students</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        {t("privacy_policy")}
      </h1>

      {/* Subheading */}
      <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12">
        {t("privacy_description")}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {policies.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-800">
                {t(section.title)}
              </h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
              {section.bullets.map((point, i) => (
                <li key={i}>{t(point)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <Link to="/home">
          <span className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition">
            <FaArrowLeft className="mr-2" />
            {t("back_to_home")}
          </span>
        </Link>
      </div>
    </div>
  );
}
