import React from 'react';
import sendMessage from '../../assets/sendMessage.jpg';

const Form = () => {
  return (
    <div className='max-w-6xl pt-32 pb-16 mx-auto'>
      <div className='flex flex-col lg:flex-row justify-center items-center bg-white rounded-lg shadow-xl'>
        
        {/* الصورة الكبيرة */}
        <div className='w-full lg:w-1/2 flex-shrink-0'>
          <img
            src={sendMessage}
            alt="Send Message"
            className='w-full h-full object-cover rounded-t-lg lg:rounded-l-lg'  // لتغطية كامل الحجم
          />
        </div>

        {/* النموذج */}
        <div className='w-full lg:w-1/2 p-6 lg:p-12'> {/* زيادة padding لجعل الفورم أكبر */}
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-8'>Send Message</h1> {/* تكبير الخط */}

          {/* الحقول */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
            <input
              type="text"
              placeholder='Name'
              className='w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type="email"
              placeholder='Email'
              className='w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
            <input
              type="text"
              placeholder='Phone'
              className='w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type="text"
              placeholder='Age'
              className='w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* حقل الرسالة */}
          <div className='mb-8'>
            <textarea
              placeholder='Your Message'
              className='w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows="6"
            />
          </div>

          {/* زر الإرسال */}
          <div className='flex justify-center'>
            <button className='w-full py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
