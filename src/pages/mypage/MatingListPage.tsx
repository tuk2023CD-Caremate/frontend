import Header from '../../components/Header.tsx'
import Userbar from '../../components/sidebar/Userbar.tsx'
import Navbar from '../../components/Navbar.tsx'
import styled from 'styled-components'
import DividerImg from '../../assets/images/divider1.png'
import CommentImg from '../../assets/images/people.png'

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const MatchingListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 25rem);
`

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  width: calc(100% - 6.25rem);
  height: 6.25rem;
  padding-left: 1.25rem;
  border: 1px solid #d8d8d8;
  margin-bottom: 2.5rem;
`

const MyPost = styled.div`
  display: flex;
  padding: 1.5rem 0rem 0rem 1.5rem;
  width: calc(100% - 6.25rem);
  height: 16rem;
  border: 1px solid #d8d8d8;
  flex-direction: column;
`

const BoardType = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #086ab5;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.625rem;
`

const Tag = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #650fa9;
  margin-top: 1.25rem;
`

const FooterWrap = styled.div`
  display: flex;
  margin-top: 1.25rem;
  align-items: center;
`

const PeopleImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`

const People = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Divider = styled.img`
  width: 2px;
  height: 1.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
`
const Participation = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
`

const DateCreated = styled.div`
  font-size: 1.5rem;
  color: #9b9b9b;
`

function MatchingListPage() {
  const lists = [
    {
      matchingType: '온라인 매칭',
      title: '맥북 초기 세팅 도와주실 분 찾습니다..',
      tag: '#맥북 #mac #초기세팅',
      peopleCount: 3,
      dateCreated: '01/06',
      participations: '정우혁 멘토',
    },
    {
      matchingType: '온라인 매칭',
      title: '맥북 초기 세팅 도와주실 분 찾습니다..',
      tag: '#맥북 #mac #초기세팅',
      peopleCount: 3,
      dateCreated: '01/06',
      participations: '정우혁 멘토',
    },
    {
      matchingType: '온라인 매칭',
      title: '맥북 초기 세팅 도와주실 분 찾습니다..',
      tag: '#맥북 #mac #초기세팅',
      peopleCount: 3,
      dateCreated: '01/06',
      participations: '정우혁 멘토',
    },
  ]
  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Userbar />
        <MatchingListWrapper>
          <PageTitle>매칭 기록</PageTitle>
          {lists.map((list, index) => (
            <MyPost key={index}>
              <BoardType>{list.matchingType}</BoardType>
              <Title>{list.title}</Title>
              <Tag>{list.tag}</Tag>
              <FooterWrap>
                <PeopleImage src={CommentImg} />
                <People>{list.peopleCount}</People>
                <Divider src={DividerImg} />
                <DateCreated>{list.dateCreated}</DateCreated>
                <Divider src={DividerImg} />
                <Participation>{list.participations}</Participation>
              </FooterWrap>
            </MyPost>
          ))}
        </MatchingListWrapper>
      </Container>
    </div>
  )
}

export default MatchingListPage
