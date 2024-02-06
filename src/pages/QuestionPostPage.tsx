import React from 'react';
import Header from '../components/Header.tsx';
import Navbar from '../components/Navbar.tsx';
import QuestionsPost from '../components/QuestionsPost.tsx';
import SideNavbar  from '../components/SideNavbar.tsx';

function BestPostPage() {
  return (
    <div>
      <Header/>
      <Navbar/>
      <div style={{display:'flex', margin:'0 10%',}}>
      <SideNavbar/>
      <QuestionsPost/>
      </div>
    </div>
  );
}

export default BestPostPage 