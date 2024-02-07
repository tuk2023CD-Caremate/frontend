import styled from 'styled-components'
import LogoImg from '../assets/images/StudyMate.svg'
import ProfileImg from '../assets/images/profile.png'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 255px);
  height: 109px;
  padding-left: 143px;
  padding-right: 143px;
  border: 2px solid;
`

const Logo = styled.img`
  width: 236px;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Profile = styled.img`
  width: 100px;
`

const NickName = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin: 10px;
`

const Sir = styled.div`
  font-size: 20px;
  margin: 5px;
`

const SignOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #dcdcdc;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  margin: 30px;
  cursor: pointer;
`

export default function Header2() {
  return (
    <Container>
      <Logo src={LogoImg} />
      <RightWrapper>
        <Profile src={ProfileImg} />
        <NickName>장희수</NickName>
        <Sir>님</Sir>
        <SignOut>로그아웃</SignOut>
      </RightWrapper>
    </Container>
  )
}
