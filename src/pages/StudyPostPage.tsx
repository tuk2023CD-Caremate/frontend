import React from 'react';
import Header from '../components/Header.tsx';
import Navbar from '../components/Navbar.tsx';
import StudyPost from '../components/StudyPost.tsx';
import SideNavbar  from '../components/SideNavbar.tsx';

function MyPostPage() {
  return (
    <div>
      <Header/>
      <Navbar/>
      <div style={{display:'flex', margin:'0 10%',}}>
      <SideNavbar/>
      <StudyPost/>
      </div>
    </div>
  );
}

export default MyPostPage 