import styled from 'styled-components'
import UserImg from '../assets/images/profile.png'

const Container = styled.div`
  width: 56.25rem;
  height: 37.5rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 1.25rem 0.625rem rgba(0, 0, 0, 0.2);
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`

const SelectWrap = styled.div`
  display: flex;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  width: 46.8rem;
  height: 16.8rem;
  flex-direction: column;
`
const UserWrap = styled.div`
  display: flex;
  align-items: center;
`
const UserImage = styled.img``

const UserRole = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0.5rem;
`
const UserNickname = styled.div`
  font-size: 1.75rem;
  margin: 0.5rem;
`
const UserInterests = styled.div`
  font-size: 1.3rem;
  margin: 0.5rem;
  font-weight: bold;
  color: #650fa9;
  margin-left: 1.25rem;
`

const DetailWrap = styled.div``

const Detail = styled.div`
  font-size: 1.5rem;
  margin-left: 1.25rem;
`

const ConfirmWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
`

const AcceptBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 6.25rem;
  height: 3rem;
  justify-content: center;
  border-radius: 0.625rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.625rem;
`

const RefuseBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 6.25rem;
  height: 3rem;
  justify-content: center;
  border-radius: 0.625rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.625rem;
`

function ConfirmMatchingModal() {
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

export default ConfirmMatchingModal
