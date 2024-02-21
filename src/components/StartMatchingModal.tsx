import React from 'react'
import styled from 'styled-components'
import UserImg from '../assets/images/profile.png'

const Container = styled.div`
  width: 900px;
  height: 600px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 70px;
`

const SelectWrap = styled.div`
  display: flex;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  width: 750px;
  height: 75px;
  align-items: center;
  justify-content: space-between;
`
const UserWrap = styled.div`
  display: flex;
  align-items: center;
`
const UserImage = styled.img``

const UserRole = styled.div`
  font-size: 20px;
  margin: 5px;
`
const UserNickname = styled.div`
  font-size: 20px;
  margin: 5px;
`
const UserInterests = styled.div`
  font-size: 18px;
  margin: 5px;
  font-weight: bold;
  color: #650fa9;
  margin-left: 20px;
`

const BtnWrap = styled.div`
  display: flex;
`

const ChatBtn = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 65px;
  height: 50px;
  justify-content: center;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
`
const VideoChatBtn = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 100px;
  height: 50px;
  justify-content: center;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
`
const FindAgain = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 100px;
  height: 50px;
  justify-content: center;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  margin-top: 70px;
`

function StartMatchingModal() {
  const mentors = [
    { id: 1, role: '멘토', nickname: '김선재님', interests: '프로그래밍' },
    { id: 2, role: '멘토', nickname: '정우혁님', interests: '프로그래밍' },
    { id: 3, role: '멘티', nickname: '최지혜님', interests: '프로그래밍' },
  ]

  return (
    <div>
      <Container>
        <Title>온라인 매칭을 찾았어요 !</Title>
        {mentors.map((mentor) => (
          <SelectWrap key={mentor.id}>
            <UserWrap>
              <UserImage src={UserImg} />
              <UserRole>{mentor.role}</UserRole>
              <UserNickname>{mentor.nickname}</UserNickname>
              <UserInterests>{mentor.interests}</UserInterests>
            </UserWrap>
            <BtnWrap>
              <ChatBtn>채팅</ChatBtn>
              <VideoChatBtn>화상채팅</VideoChatBtn>
            </BtnWrap>
          </SelectWrap>
        ))}
        <FindAgain>다시 찾기</FindAgain>
      </Container>
    </div>
  )
}

export default StartMatchingModal
