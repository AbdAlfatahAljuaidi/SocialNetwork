import React from 'react'
import Nav from '../Index/Nav'
import { Link } from 'react-router-dom'

const Video = () => {
  return (
    <div>
         <div className="sticky top-0 z-50 flex justify-between  items-center py-4 px-8 bg-white shadow-md flex-wrap sm:flex-nowrap">
              <div className="font-bold text-3xl  w-full sm:w-auto text-center sm:text-left pt-4 md:pt-0 mb-4 sm:mb-0" >
                   <Link to={'/Index'}> Ask AAU </Link> 
                   </div>
         </div>
      
      
      <section className="p-4 md:p-5 bg-gray-100 mt-5 md:mt-0 ">
        <h2 className="text-2xl font-bold mb-4 text-center"> Watch the Video </h2>

        <div className="w-full max-w-4xl mx-auto aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // استبدل بالرابط الذي تريده
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  )
}

export default Video
