import React, { useState } from 'react';
import Nav from '../Index/Nav';
import Menu from './Menu';
import Extra from './Extra';
import OfficialPosts from './OfficialPosts'; // تأكد أنك أنشأت هذا الملف
import FromAdmin from './FromAdmin';

const IndexTwo = () => {
  const [activeSection, setActiveSection] = useState('posts'); // الحالة

  return (
    <div className='bg-slate-50'>
      <Nav setActive={setActiveSection} />
      <div className='flex justify-center'>
        <Menu  setActiveSection={setActiveSection} isSticky={true}  />
       <FromAdmin />
        <Extra />
      </div>
    </div>
  );
};

export default IndexTwo;
