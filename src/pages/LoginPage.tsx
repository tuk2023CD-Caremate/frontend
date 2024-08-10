import { styled } from 'styled-components'
import Login from '../components/Login.tsx'

const WhiteSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  padding-left: 8rem;
  padding-right: 8rem;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7rem);
`

function LoginPage() {
  return (
    <div>
      <WhiteSpace />
      <Container>
        <Login />
      </Container>
    </div>
  )
}

export default LoginPage
