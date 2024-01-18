import React, {useState} from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: none;
  justify-content: center;
  align-items: center;
}
`;

const SignUpWrapper = styled.div`
width: 450px;
height: 670px;
padding: 40px;
box-sizing: border-box;
border-radius: 10px;
border: 0.5px solid var(--Gray-03, #BDBDBD);
display: flex;
justify-content: center;
align-items: center;
`;

const SignUpH2 = styled.h2`
width: 100%;
height: 40px;
color: #650FA9;
font-size: 32px;
font-weight: 600;
text-align: center;
margin-bottom: 30px;
`;

const SignUpInput = styled.input`
text-indent: 20px;
width: 325px;
height: 47px;
padding: 0 10px;
box-sizing: border-box;
background-color: #fff;
border-radius:10px;
border: 1px #BDBDBD solid;
margin-bottom: 20px;
font-size: 14px;
display: flex;
flex-direction: column;
align-items: center;

`;

const RoleBtn = styled.div`
display: flex;
`;

const RoleButton1 = styled.button`
width: 150px;
height: 40px;
margin-right: 25px;
white-space: nowrap;
font-size: 14px;
border-color: #bdbdbd;
display: flex;
justify-content: center;
align-items: center;
&:hover,
&:active{
  border-color: #650FA9;
}
`;

const RoleButton2 = styled.button`
width: 150px;
height: 40px;
white-space: nowrap;
font-size: 14px;
border-color: #bdbdbd;
display: flex;
justify-content: center;
align-items: center;
&:hover,
&:active{
  border-color: #650FA9;
}
`;

const Checkbox = styled.div`
margin-top:20px;
display: flex;
flex-direction: column;
font-size: 14px;
`;

const AgreeCheck = styled.input`
appearance: none;
width: 16px;
height: 16px;
background-color: #fff;
border: 1.5px solid gainsboro;
border-radius: 4px;

&:checked{ //추후 check표시 이미지 추가
background-color: #650FA9;
border: 1px #650FA9 solid;
}

`;

const SignUpSubmit = styled.button`
width: 325px;
height: 55px;
border-radius: 10px;
border: 1px solid var(--Gray-03, #BDBDBD);
background: var(--bdbdbd, #650FA9);
color: var(--White, #FFF);
font-size: 18px;
font-weight: 600;
margin-top: 20px;
`;


export default function Login() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassowrd2] = useState("");

  const onNameHandler = (e: { currentTarget: { value: React.SetStateAction<string>; }; })=> {
    setName(e.currentTarget.value);
  }

  const onEmailHandler = (e: { currentTarget: { value: React.SetStateAction<string>; }; })=> {
    setEmail(e.currentTarget.value);
  }
  const onNickNameHandler = (e: { currentTarget: { value: React.SetStateAction<string>; }; })=> {
    setNickname(e.currentTarget.value);
  }

  const onPassword1Handler = (e: { currentTarget: { value: React.SetStateAction<string>; }; })=>{
    setPassword1(e.currentTarget.value);
  }
  const onPassword2Handler = (e: { currentTarget: { value: React.SetStateAction<string>; }; })=>{
    setPassowrd2(e.currentTarget.value);
  }

  const onLoginHandler = (e: { preventDefault: () => void; })=>{
    e.preventDefault();
    console.log("name: "+name, "email: "+ email, "nickname: "+ nickname, "password: "+ password1 );


    if(email === '' || password1 === ''||name===''|| nickname===''||password2===''){
     window.alert("회원가입에 실패하셨습니다. 입력정보를 다시 확인해주세요.");
     return;
    }
  }
 
  return (
    <>
      <GlobalStyle />
      <SignUpWrapper>
        <form onSubmit={onLoginHandler}>
          <SignUpH2>SignUp to StudyMate</SignUpH2>
          <SignUpInput type="text" placeholder="이름" value={name} onChange={onNameHandler} />
          <SignUpInput type="text" placeholder="닉네임"value={nickname} onChange={onNickNameHandler} />
          <SignUpInput type="email" placeholder="이메일" value={email} onChange={onEmailHandler} />
          <SignUpInput type="password" placeholder="비밀번호" value={password1} onChange={onPassword1Handler} />
          <SignUpInput type="password" placeholder="비밀번호 확인" value={password2} onChange={onPassword2Handler}/>
          <RoleBtn>
              <RoleButton1 type="button">멘토</RoleButton1>
              <RoleButton2 type="button">멘티</RoleButton2>
          </RoleBtn>
          <Checkbox>
          <label>
          <AgreeCheck type="checkbox"/> 이용약관 동의 (필수)</label>
          <label>
          <AgreeCheck type="checkbox"/> 개인정보 수집 및 이용동의 (필수)</label>
          <label>
          <AgreeCheck type="checkbox"/> 위치정보서비스 이용동의 (선택)</label>
          </Checkbox>
          <SignUpSubmit>가입하기</SignUpSubmit>
          </form>
      </SignUpWrapper>
    </>
  );
}
