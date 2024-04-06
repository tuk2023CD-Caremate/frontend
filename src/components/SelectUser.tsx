import styled from 'styled-components'
import { IoMdStar, IoMdHeartEmpty, IoIosContacts } from 'react-icons/io'

import ProfileIMG from '../assets/images/김영한.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1280px;
  height: 360px;
  border: 3px solid #d8d8d8;
  &:hover {
    border: 3px solid black;
  }
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 20px;
`

const LeftWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 3;
  margin-right: 50px;
`

const ImgWrap = styled.div`
  display: flex;
  flex: 1;
`

const ProfileImg = styled.img`
  width: 160px;
  height: 160px;
  margin-top: 20px;
`

const InfoWrap = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`

const Section = styled.div`
  display: flex;
  align-items: center;
`
const BigTitle = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: bold;
  margin: 5px;
`

const BigContent = styled.div`
  display: flex;
  font-size: 32px;
  font-weight: bold;
  margin: 5px;
`

const Title = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
`

const Content = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
`
const Detail = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
`

const RightWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 2;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Upper = styled.div`
  width: 440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ReputationWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const LikeWrap = styled.div`
  display: flex;
`

const Lower = styled.div`
  width: 440px;
  display: flex;
`

const RequestBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 32px;
  font-weight: bold;
  width: inherit;
  height: 60px;
  background-color: #e8dcf2;
  color: #650fa9;
  margin-top: 20px;
  margin-bottom: 20px;
`

function SelectUser() {
  return (
    <div>
      <Container>
        <LeftWrap>
          <ImgWrap>
            <ProfileImg src={ProfileIMG} />
          </ImgWrap>
          <InfoWrap>
            <Section>
              <BigTitle>김영한</BigTitle>
              <BigContent>영한코딩</BigContent>
              <IoIosContacts size={32} />
              <Content>11</Content>
            </Section>
            <Section>
              <Title>분야</Title>
              <Content>프로그래밍</Content>
              <Detail>백엔드 JPA OOP</Detail>
            </Section>
            <Section>
              <Title>직업</Title>
              <Content>인프런 강사</Content>
            </Section>
            <Section>
              <Title>이메일</Title>
              <Content>woal1234@naver.com</Content>
            </Section>
            <Section>
              <Title>Blog</Title>
              <Content>https://velog.io/@woal9844</Content>
            </Section>
            <Section>
              <Content>
                지식을 배우고 나눠요 — 더 좋은 경험, 더 좋은 콘텐츠로 올바른 IT생태계를 만들기 위해
                노력합니다.{' '}
              </Content>
            </Section>
          </InfoWrap>
        </LeftWrap>
        <RightWrap>
          <Upper>
            <ReputationWrap>
              <Section>
                <IoMdStar size={40} />
                <BigContent>4.1</BigContent>
                <Content>/</Content>
                <BigContent>리뷰 {13}</BigContent>
              </Section>
            </ReputationWrap>
            <LikeWrap>
              <Content>10</Content>
              <IoMdHeartEmpty size={40} />
            </LikeWrap>
          </Upper>
          <Lower>
            <RequestBtn>매칭 요청</RequestBtn>
          </Lower>
        </RightWrap>
      </Container>
    </div>
  )
}

export default SelectUser
