import Header from '../components/Header'
import styled from 'styled-components'
import onboarding1 from '../assets/images/onboarding1.png'

const Container = styled.div`
  background-image: url(${onboarding1});
  width: 100dvw; /* 적절한 너비 설정 */
  height: 100dvh; /* 적절한 높이 설정 */
  background-size: cover; /* 이미지가 컨테이너에 맞게 확대되도록 설정 */
`

function MainPage() {
  return (
    <div>
      <Header />
      <Container></Container>
    </div>
  )
}

export default MainPage
