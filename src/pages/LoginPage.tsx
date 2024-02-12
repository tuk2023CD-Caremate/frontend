import Login from '../components/Login.tsx'
import Header2 from '../components/Header2.tsx'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 109px);
`

function LoginPage() {
  return (
    <div>
      <Header2 />
      <Container>
        <Login />
      </Container>
    </div>
  )
}

export default LoginPage
