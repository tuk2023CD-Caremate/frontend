import React from 'react';
import Header from '../components/Header.tsx';
import Navbar from '../components/Navbar.tsx';
import MainPost from '../components/MainPost.tsx';
import SideNavbar  from '../components/SideNavbar.tsx';

function PostPage() {
  return (
    <div>
      <Header/>
      <Navbar/>
      <div style={{display:'flex', margin:'0 10%',}}>
      <SideNavbar/>
      <MainPost/>
      </div>
    </div>
  );
}

export default PostPage 