import React, { useState } from 'react';
import Nav from '../Index/Nav';
import Menu from './Menu';
import Extra from './Extra';
import OfficialPosts from './OfficialPosts'; // تأكد أنك أنشأت هذا الملف

const FromAdmin = () => {
  const [activeSection, setActiveSection] = useState('posts'); // الحالة

  return (
    <div className='bg-slate-50'>
      <Nav setActive={setActiveSection} />
      <div className='flex justify-center'>
        <Menu isSticky={true} />
       <OfficialPosts />
        <Extra />
      </div>
    </div>
  );
};

export default FromAdmin;
