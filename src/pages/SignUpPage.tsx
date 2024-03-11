import SignUp from '../components/SignUp.tsx'
import { styled } from 'styled-components'

const WhiteSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 109px;
  padding-left: 140px;
  padding-right: 140px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 109px);
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
