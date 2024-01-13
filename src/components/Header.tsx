import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="header_container">
      <h2>StudyMate</h2>
      <input type="text" placeholder= "검색 내용을 입력하세요" className="header_input" />
      <div className="header_member">
      <a href="#" className="header_login">로그인</a>
      <input type="button" value= "회원가입" className="header_signup"/>
      </div>
    </div>
  )
}
