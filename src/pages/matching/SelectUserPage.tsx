import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/Header'
import SelectUser from '../../components/matching/SelectUser'
import Navbar from '../../components/Navbar'
import { useUserListStore } from '../../store/store'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 13.75rem);
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`

const Text = styled.div`
  display: flex;
  width: 80rem;
  margin: 0 auto;
  font-size: 1.75rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
`

function SelectUserPage() {
  const location = useLocation()
  const IdInfo = location.state.id
  const pathInfo = location.state.pathname
  const { userList } = useUserListStore()

  return (
    <div>
      <Header />
      <Navbar />
      <Text>나에게 필요한 {userList.length}명의 멘토 리스트</Text>
      <Container>
        <SelectUser id={IdInfo} pathInfo={pathInfo} />
      </Container>
    </div>
  )
}

export default SelectUserPage
