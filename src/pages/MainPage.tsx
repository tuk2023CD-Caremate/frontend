import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MainHeader1 from '../components/main/MainHeader1'
// import MainHeader2 from '../components/main/MainHeader2'
import MainFirst from '../components/main/MainFirst'
import MainFourth from '../components/main/MainFourth'
import MainSecond from '../components/main/MainSecond'
import MainThird from '../components/main/MainThird'
import StartNav from '../components/main/StartNav'
import MainFooter from '../components/main/MainFooter'
import Header from '../components/Header'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

function MainPage() {
  const navigate = useNavigate()

  const token = localStorage.getItem('accessToken')

  const handleStart = () => {
    if (token) {
      navigate('/mypage')
    } else {
      navigate('/login')
    }
  }

  const headerComponent = token ? <Header /> : <MainHeader1 />

  return (
    <div>
      {headerComponent}
      <Container>
        <MainFirst />
        <MainSecond />
        <MainThird />
        <MainFourth />
        <MainFooter />
        <StartNav handleStart={handleStart} />
      </Container>
    </div>
  )
}

export default MainPage
