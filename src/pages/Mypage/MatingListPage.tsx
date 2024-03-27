import Header2 from '../../components/Header2.tsx'
import Userbar from '../../components/sidebar/Userbar.tsx'
import Navbar2 from '../../components/Navbar2.tsx'
import styled from 'styled-components'
import DividerImg from '../../assets/images/divider1.png'
import CommentImg from '../../assets/images/people.png'
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

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  width: calc(100% - 100px);
  height: 100px;
  padding-left: 20px;
  border: 1px solid #d8d8d8;
  margin-bottom: 40px;
`

const MyPost = styled.div`
  display: flex;
  padding: 20px 0px 0px 20px;

  width: calc(100% - 100px);
  height: 255px;
  border: 1px solid #d8d8d8;
  flex-direction: column;
`

const BoardType = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #086ab5;
  margin: 10px;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin: 10px;
`

const Tag = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #650fa9;
  margin: 10px;
  margin-top: 20px;
`

const FooterWrap = styled.div`
  display: flex;
  margin: 10px;
  margin-top: 20px;
  align-items: center;
`

const PeopleImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`

const People = styled.div`
  font-size: 28px;
  font-weight: bold;
`

const Divider = styled.img`
  width: 2px;
  height: 20px;
  margin-left: 20px;
  margin-right: 20px;
`
const Participation = styled.div`
  font-size: 28px;
  color: #9b9b9b;
`

const DateCreated = styled.div`
  font-size: 28px;
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
      <Header2 />
      <Navbar2 />
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
