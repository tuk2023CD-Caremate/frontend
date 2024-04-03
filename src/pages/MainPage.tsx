import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import MainFirst from '../components/main/MainFirst'
import MainFourth from '../components/main/MainFourth'
import MainSecond from '../components/main/MainSecond'
import MainThird from '../components/main/MainThird'
import StartNav from '../components/main/StartNav'

function MainPage() {
  const navigate = useNavigate()
  const handleStart = () => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      navigate('/mypage')
    } else {
      navigate('/login')
    }
  }
  return (
    <div>
      <Header />
      <MainFirst />
      <MainSecond />
      <MainThird />
      <MainFourth />
      <StartNav handleStart={handleStart} />
    </div>
  )
}

export default MainPage
