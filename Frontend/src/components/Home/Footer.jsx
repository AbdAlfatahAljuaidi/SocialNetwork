import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import crypto from "../../assets/crypto.jpg";
import foot from "../../assets/footer.jpg";

const Footer = () => {
  return (
    <div
      className="p-10 text-white"
      style={{
        backgroundImage: `url(${foot})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-screen-xl mx-auto" id="Contact">
        {/* Column 1: MRERROR */}
        <div>
          <h1 className="text-2xl font-bold mb-4">MRERROR</h1>
          <p className="mb-6 text-gray-300">
            Completely strategize client-centric solutions. Phosfluorescently
            iterate efficient internal or organic strategies.
          </p>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <FaFacebook className="text-xl cursor-pointer hover:text-blue-500" />
            <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
            <FaInstagram className="text-xl cursor-pointer hover:text-pink-500" />
            <FaLinkedin className="text-xl cursor-pointer hover:text-blue-700" />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Quick Links</h1>
          <ul className="space-y-3">
            {["Home", "About Us", "Contact Us", "Services", "Our Team"].map(
              (link) => (
                <li key={link} className="flex items-center space-x-2">
                  <FaArrowRight className="text-gray-400" />
                  <h4 className="text-gray-300 hover:text-white cursor-pointer">
                    {link}
                  </h4>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 3: Popular Post */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Popular Post</h1>
          <div className="space-y-6">
            {[crypto, crypto].map((img, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={img}
                  alt="Post"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h1 className="text-gray-300 text-sm">
                    Content strategy can help engage customers.
                  </h1>
                  <p className="text-gray-400 text-xs">October 29, 2023</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Contact Info</h1>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaLocationDot className="text-xl" />
              <div>
                <h1 className="text-gray-300">Location</h1>
                <p className="text-gray-400 text-sm">
                  55 Main Street, New York.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MdEmail className="text-xl" />
              <div>
                <h1 className="text-gray-300">Email</h1>
                <p className="text-gray-400 text-sm">example@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-xl" />
              <div>
                <h1 className="text-gray-300">Phone</h1>
                <p className="text-gray-400 text-sm">+962 78-89-658-98</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="h-[1px] w-[75%] m-auto bg-main mt-7"></div>

      {/* Footer Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-evenly mt-6">
        <div className="text-center sm:text-left">
          <h1>© 2022 All Rights Reserved.</h1>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 mt-3 sm:mt-0">
          <h1 className="cursor-pointer hover:text-white">Privacy Policy</h1>
          <h1 className="cursor-pointer hover:text-white">Terms & Conditions</h1>
          <h1 className="cursor-pointer hover:text-white">Contact Us</h1>
        </div>
      </div>

  
    </div>
  );
};

export default Footer;
