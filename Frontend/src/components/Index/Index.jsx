import React, { useState } from 'react';
import Nav from '../Index/Nav';
import Menu from './Menu';
import Post from './Post';
import Extra from './Extra';
import Bookmarks from '../ExtraIndex/Bookmarks';
import OfficialPosts from './OfficialPosts'; // تأكد أنك أنشأت هذا الملف

const Index = () => {
  const [activeSection, setActiveSection] = useState('posts'); // الحالة

  return (
    <div className='bg-slate-50'>
      <Nav />
      <div className='flex justify-center'>
        <Menu setActiveSection={setActiveSection} />
        {activeSection === 'posts' && <Post />}
        {activeSection === 'official' && <OfficialPosts />}
        <Extra />
      </div>
    </div>
  );
};

export default Index;
