import styled from 'styled-components'
import LogoImg from '../../assets/images/StudyMate.svg'
import { Link, useNavigate } from 'react-router-dom'

const Container = styled.div`
  position: fixed;
  z-index: 3;
`
const Wrap = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  height: 7rem;
  padding-left: 8.75rem;
  padding-right: 8.75rem;
`

const Logo = styled.img`
  width: 15rem;
  cursor: pointer;
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
  border-radius: 0.625rem;
  background-color: #ffffff;
  border: solid 1px #bdbdbd;
  width: 7.5rem;
  height: 3rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 2rem;
  cursor: pointer;
`

export default function MainHeader1() {
  const navigate = useNavigate()

  return (
    <Container>
      <Wrap>
        <Logo src={LogoImg} onClick={() => navigate('/')} />
        <RightWrapper>
          <Link to={'/login'}>
            <Btn>로그인</Btn>
          </Link>
          <Link to={'/signup'}>
            <Btn>회원가입</Btn>
          </Link>
        </RightWrapper>
      </Wrap>
    </Container>
  )
}
