import {
  FaGavel,
  FaUserCheck,
  FaBan,
  FaHandshake,
  FaRegClock,
  FaArrowLeft,
  FaUniversity,
} from "react-icons/fa";
import { Link } from "react-router-dom";
  
  const terms = [
    {
      icon: <FaGavel className="text-indigo-600 w-8 h-8" />,
      title: "1. Acceptance of Terms",
      bullets: [
        "By using ASK AAU, you agree to comply with these terms.",
        "You must be a registered university student to participate.",
      ],
    },
    {
      icon: <FaUserCheck className="text-green-600 w-8 h-8" />,
      title: "2. User Responsibilities",
      bullets: [
        "Provide accurate information in your profile.",
        "Respect other users and avoid offensive content.",
        "Use the platform for educational purposes only.",
      ],
    },
    {
      icon: <FaBan className="text-red-500 w-8 h-8" />,
      title: "3. Prohibited Activities",
      bullets: [
        "No spamming, harassment, or abusive behavior.",
        "No posting of false, misleading, or illegal content.",
        "Avoid impersonating others or using fake identities.",
      ],
    },
    {
      icon: <FaHandshake className="text-yellow-500 w-8 h-8" />,
      title: "4. Content Ownership",
      bullets: [
        "You retain ownership of content you post.",
        "ASK AAU may use content for academic insights.",
        "You grant ASK AAU a license to display your content.",
      ],
    },
    {
      icon: <FaRegClock className="text-blue-500 w-8 h-8" />,
      title: "5. Modifications to Terms",
      bullets: [
        "Terms may be updated at any time.",
        "Users will be notified of significant changes.",
        "Continued use means acceptance of new terms.",
      ],
    },
  ];
  
  export default function TermsConditions() {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-8">
        {/* Header / Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <FaUniversity className="text-indigo-700 w-8 h-8" />
            <span className="text-2xl font-bold text-indigo-800">ASK AAU</span>
          </div>
        </div>
  
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Terms & Conditions
        </h1>
  
        {/* Subheading */}
        <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          Please read the following terms carefully before using ASK AAU. Your use of our platform implies agreement to these conditions.
        </p>
  
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {terms.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                {section.icon}
                <h2 className="text-xl font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
                {section.bullets.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
  
        {/* Back Button */}
        <div className="flex justify-center mt-12">
            <Link to={"/home"}>
          <a
            href="/home"
            className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </a>
          </Link>
        </div>
      </div>
    );
  }
  