import React from "react";

import cardsData from '../Data/Data';

const Service = () => {
  return (
    <div className="pt-32 flex flex-col items-center px-4 bg-[#EFF2F7] pb-32">
     <div className="text-center mb-12">
  <h1 className="text-xl font-semibold uppercase tracking-wide text-blue-600">
    Our Expertise
  </h1>
  
  <h2 className="text-5xl font-extrabold mt-4 text-gray-900 leading-snug">
    We Provide a Wide Range <br />
    <span className="text-blue-500">IT Solutions</span> for Your Business
  </h2>
  
  <p className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
    From software development to cloud computing, we offer a full suite of IT services to help you grow and innovate.
  </p>
</div>


      {/* الخط مع الدائرة المتحركة */}
      <div className="flex justify-center items-center mt-8 relative">
        <div className="w-32 h-1 bg-blue-300 relative">
          {/* الدائرة المتحركة */}
          <div className="absolute top-[-5px] left-0 w-3 h-3 bg-main rounded-full animate-moving-circle"></div>
        </div>
      </div>

      <div className="w-[90%] m-auto mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* تكرار الـ Cards باستخدام .map */}
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="group bg-white shadow-xl rounded-xl p-8 flex flex-col items-center relative transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-blue-100 rounded-full mb-5 w-16 h-16 flex justify-center items-center text-blue-700 text-2xl">
                <card.icon />
              </div>
              <div className="text-center">
                <h2 className="font-bold text-2xl mb-2 text-gray-800">{card.title}</h2>
                <p className="text-lg text-gray-600">{card.description}</p>
              </div>
              <span className="absolute bottom-0 bg-blue-700 h-1 w-[80%] group-hover:w-full rounded-b-lg  transition-all duration-300 "></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
