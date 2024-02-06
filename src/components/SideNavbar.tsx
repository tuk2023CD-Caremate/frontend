import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}
body {
    background-color: #fff;
  }
`
const FrameContainer = styled.div`
  background-color: #ffffff;
  height: 600px;
  width: 200px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;
`
const TextGroup = styled.div`
width: 200px;
height: 150px;
margin-top: 20%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SideClick = styled.button`
  color: #000;
  font-weight: normal;
  font-size: 15px;
  text-align: center;
  padding:5%;
  &:hover,
  &:active {
    font-weight: bold;
    color: #650fa9;

    border-radius: 5px;
  }
`

export default function SideNavbar() {
  return (
    <>
      <GlobalStyle />
      <FrameContainer>
        <TextGroup>
          <SideClick as="a" href="/post">
            자유게시판
          </SideClick>
          <SideClick as="a" href="/questions">
            질문 게시판
          </SideClick>
          <SideClick as="a" href="/study">
            스터디 게시판
          </SideClick>
        </TextGroup>
      </FrameContainer>
    </>
  )
}
