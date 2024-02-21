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
  margin-bottom: 50px;
`

const SelectWrap = styled.div`
  display: flex;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  width: 750px;
  height: 270px;
  flex-direction: column;
`
const UserWrap = styled.div`
  display: flex;
  align-items: center;
`
const UserImage = styled.img``

const UserRole = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin: 5px;
`
const UserNickname = styled.div`
  font-size: 28px;
  margin: 5px;
`
const UserInterests = styled.div`
  font-size: 22px;
  margin: 5px;
  font-weight: bold;
  color: #650fa9;
  margin-left: 20px;
`

const DetailWrap = styled.div``

const Detail = styled.div`
  font-size: 24px;
  margin-left: 20px;
`

const ConfirmWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`

const AcceptBtn = styled.button`
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

const RefuseBtn = styled.button`
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

function ConfirmMatching() {
  return (
    <div>
      <Container>
        <Title>온라인 매칭을 진행할까요 ?</Title>
        <SelectWrap>
          <UserWrap>
            <UserImage src={UserImg} />
            <UserRole>멘티</UserRole>
            <UserNickname>최지혜</UserNickname>
            <UserInterests>프로그래밍</UserInterests>
          </UserWrap>
          <DetailWrap>
            <Detail>학교 : 한국공학대학교</Detail>
            <Detail>회사 : 삼성전자</Detail>
            <Detail>블로그 : https://velog.io/@woal9844/posts</Detail>
            <Detail>수상경력 : 2024 공학대전 총장상</Detail>
          </DetailWrap>
        </SelectWrap>
        <ConfirmWrap>
          <AcceptBtn>수락</AcceptBtn>
          <RefuseBtn>거절</RefuseBtn>
        </ConfirmWrap>
      </Container>
    </div>
  )
}

export default ConfirmMatching
