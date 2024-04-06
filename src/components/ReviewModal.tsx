import { useEffect } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { IoMdStar, IoMdClose } from 'react-icons/io'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const Header = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: bold;
  margin: 20px;
  margin-left: 70px;
`

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1000px;
  margin: 0 auto;
  height: max-content;
  border-top: 2px solid #d8d8d8;
  border-bottom: 2px solid #d8d8d8;
  padding-top: 20px;
  padding-bottom: 20px;
`

const Writer = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: bold;
`

const WriteDate = styled.div`
  display: flex;
  font-size: 24px;
  color: #717171;
`

const StarWrap = styled.div`
  display: flex;
  margin: 15px;
  margin-left: 0px;
`

const Title = styled.div`
  display: flex;
  font-size: 26px;
  font-weight: bold;
`

const Content = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 10px;
`

function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  useEffect(() => {}, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(181, 181, 181, 0.2)',
          display: 'flex',
          justifyContent: 'center', // 수평 가운데 정렬
          alignItems: 'center', // 수직 가운데 정렬
        },
        content: {
          width: '1200px',
          maxHeight: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '20px', // 모달 내부 요소를 기준으로 절대 위치 설정
        },
      }}>
      <IoMdClose
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          marginBottom: '20px',
        }}
      />
      <Header>우혁정님의 리뷰</Header>
      <MainWrap>
        <Writer>휘리릭</Writer>
        <WriteDate>3월 24, 2024</WriteDate>
        <StarWrap>
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
        </StarWrap>
        <Title>제목</Title>
        <Content>
          첫 수업이 굉장히 알차게 흘러갔어요! 발음과 단어 그리고 이미지를 활용한 표현방법 연습 등
          여러가지를 50분동안 배웠는데요. 낭비되는 시간없이 꽉꽉 채워 수업을 할 수 있어서 매우
          만족스럽습니다! :) 여태까지 진행했던 프레플리 수업 중에서 가장 기억에 남는 수업입니다!
        </Content>
      </MainWrap>
      <MainWrap>
        <Writer>휘리릭</Writer>
        <WriteDate>3월 24, 2024</WriteDate>
        <StarWrap>
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
        </StarWrap>
        <Title>제목</Title>
        <Content>
          첫 수업이 굉장히 알차게 흘러갔어요! 발음과 단어 그리고 이미지를 활용한 표현방법 연습 등
          여러가지를 50분동안 배웠는데요. 낭비되는 시간없이 꽉꽉 채워 수업을 할 수 있어서 매우
          만족스럽습니다! :) 여태까지 진행했던 프레플리 수업 중에서 가장 기억에 남는 수업입니다!
        </Content>
      </MainWrap>
      <MainWrap>
        <Writer>휘리릭</Writer>
        <WriteDate>3월 24, 2024</WriteDate>
        <StarWrap>
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
        </StarWrap>
        <Title>제목</Title>
        <Content>
          첫 수업이 굉장히 알차게 흘러갔어요! 발음과 단어 그리고 이미지를 활용한 표현방법 연습 등
          여러가지를 50분동안 배웠는데요. 낭비되는 시간없이 꽉꽉 채워 수업을 할 수 있어서 매우
          만족스럽습니다! :) 여태까지 진행했던 프레플리 수업 중에서 가장 기억에 남는 수업입니다!
        </Content>
      </MainWrap>
      <MainWrap>
        <Writer>휘리릭</Writer>
        <WriteDate>3월 24, 2024</WriteDate>
        <StarWrap>
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
          <IoMdStar size={32} />
        </StarWrap>
        <Title>제목</Title>
        <Content>
          첫 수업이 굉장히 알차게 흘러갔어요! 발음과 단어 그리고 이미지를 활용한 표현방법 연습 등
          여러가지를 50분동안 배웠는데요. 낭비되는 시간없이 꽉꽉 채워 수업을 할 수 있어서 매우
          만족스럽습니다! :) 여태까지 진행했던 프레플리 수업 중에서 가장 기억에 남는 수업입니다!
        </Content>
      </MainWrap>
    </Modal>
  )
}

export default ReviewModal
