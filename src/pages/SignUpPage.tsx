import Header2 from '../components/Header2.tsx'
import SignUp from '../components/SignUp.tsx'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 109px);
`

function SignUpPage() {
  return (
    <div>
      <Header2 />
      <Container>
        <SignUp />
      </Container>
    </div>
  )
}

export default SignUpPage
