import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import MainFirst from '../components/main/MainFirst'
import MainFourth from '../components/main/MainFourth'
import MainSecond from '../components/main/MainSecond'
import MainThird from '../components/main/MainThird'
import StartNav from '../components/main/StartNav'

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

  const headerComponent = token ? <Header2 /> : <Header />

  return (
    <div>
      {headerComponent}
      <MainFirst />
      <MainSecond />
      <MainThird />
      <MainFourth />
      <StartNav handleStart={handleStart} />
    </div>
  )
}

export default MainPage
