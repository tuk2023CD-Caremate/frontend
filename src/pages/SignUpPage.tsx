import SignUp from '../components/SignUp.tsx'
import { styled } from 'styled-components'

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

function SignUpPage() {
  return (
    <div>
      <WhiteSpace />
      <Container>
        <SignUp />
      </Container>
    </div>
  )
}

export default SignUpPage
