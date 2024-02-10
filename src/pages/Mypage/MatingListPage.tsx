import Header2 from '../../components/Header2.tsx'
import MypageBar from '../../components/sidebar/Mypagebar.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`

const MatchingListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 400px);
`

function MatchingListPage() {
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <MypageBar />
        <MatchingListWrapper></MatchingListWrapper>
      </Container>
    </div>
  )
}

export default MatchingListPage
