import styled from 'styled-components'
import LogoImg from '../assets/images/StudyMate.svg'
import { Link, useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 109px;
  padding-left: 140px;
  padding-right: 140px;
`

const Logo = styled.img`
  width: 236px;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #ffffff;
  border: solid 1px #bdbdbd;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  margin: 30px;
  cursor: pointer;
`

export default function Header() {
  const navigate = useNavigate()

  return (
    <Container>
      <Logo src={LogoImg} onClick={() => navigate('/')} />
      <RightWrapper>
        <Link to={'/login'}>
          <Btn>로그인</Btn>
        </Link>
        <Link to={'/signup'}>
          <Btn>회원가입</Btn>
        </Link>
      </RightWrapper>
    </Container>
  )
}
