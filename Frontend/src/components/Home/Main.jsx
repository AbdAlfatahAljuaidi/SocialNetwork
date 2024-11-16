import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';

import Main1 from '../../assets/Main1.jpg';
import Main2 from '../../assets/Main2.jpg';
import Main3 from '../../assets/Main3.jpg';

const Main = () => {
    return (
        <Swiper
            className="w-full"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}  // تحديد المسافة بين الشرائح إلى صفر
            slidesPerView={1}
            navigation
            effect="fade"
            grabCursor={true} 
            keyboard={{
                enabled: true, // تمكين التبديل باستخدام لوحة المفاتيح
              }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnHover: true,  }} // تعطيل التوقف عند التفاعل
           // إيقاف التغيير التلقائي عند وضع الماوس على الصورة
        >
            <SwiperSlide>
                <div className="relative w-full h-[87vh]">
                    <img className="object-cover w-full h-full" src={Main1} alt="Slide 1" />
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className='text-center'>
                            <h1 className="text-white text-xl">SECURE IT SOLUTION SERVICE.</h1>
                            <h2 className='text-white text-5xl font-bold mt-3'>Collaboration enhances knowledge</h2>
                            <h1 className="text-white text-xl mt-6">We provide the best collaborate for university</h1>
                            <button className='mt-4 bg-main text-white rounded-lg px-9 py-3 hover:bg-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'>
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative w-full h-[87vh]">
                    <img className="object-cover w-full h-full" src={Main2} alt="Slide 2" />
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className='text-center'>
                            <h1 className="text-white text-xl">SECURE IT SOLUTION SERVICE.</h1>
                            <h2 className='text-white text-5xl font-bold mt-3'>Collaboration enhances knowledge</h2>
                            <h1 className="text-white text-xl mt-6">We provide the best collaborate for university</h1>
                        
                            <button className='mt-4 bg-main text-white rounded-lg px-9 py-3 hover:bg-main hover:border-main focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'>
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative w-full h-[87vh]">
                    <img className="object-cover w-full h-full" src={Main3} alt="Slide 3" />
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className='text-center'>
                            <h1 className="text-white text-xl">SECURE IT SOLUTION SERVICE.</h1>
                            <h2 className='text-white text-5xl font-bold mt-3'>Collaboration enhances knowledge</h2>
                            <h1 className="text-white text-xl mt-6">We provide the best collaborate for university</h1>
                            <button className='mt-4 bg-main text-white rounded-lg px-9 py-3 hover:bg-main hover:border-main focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'>
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Main;
