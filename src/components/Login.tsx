import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login_wrapper">
      <h2>Login to StudyMate</h2>
        <input type="email" placeholder= "이메일" className="input" />
        <input type="password" placeholder= "비밀번호" className="input" />
        <input type="submit" value= "로그인" className='login_submit'/>
        <p className="find_more">
          <a href="#" className="find_it">아이디(이메일)찾기</a>
          <a href="#" className="find_it">비밀번호 찾기</a>
          <a href="#" className="find_it">회원가입</a>
        </p>
        <h4>간편로그인</h4>
        <div className='submit_btn'>
        <input type="submit" value= "" className='kakao_submit'/>
        <input type="submit" value= "" className='google_submit'/>
        </div>
        
    </div>
  )
}