import styled from 'styled-components'
import Header2 from '../../components/Header2'
import Navbar2 from '../../components/Navbar2'
// import SelectUserModal from '../../components/SelectUserModal'
import { useLocation } from 'react-router-dom'
import SelectUser from '../../components/SelectUser'
import { useState } from 'react'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  width: 1280px;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
`

const Text = styled.div`
  display: flex;
  width: 1280px;
  margin: 0 auto;
  font-size: 28px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
`

function SelectUserPage() {
  // const location = useLocation()
  // const IdInfo = location.state
  const [userCount, setUserCount] = useState(5)

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Text>나에게 필요한 {userCount}명의 멘토 리스트</Text>
      <Container>
        <SelectUser />
        <SelectUser />
        <SelectUser />
        {/* <SelectUserModal id={IdInfo} /> */}
        {/* <ConfirmMatchingModal /> */}
        {/* <FindLoadingModal /> */}
        {/* <MatchingLoadingModal /> */}
      </Container>
    </div>
  )
}

export default SelectUserPage
