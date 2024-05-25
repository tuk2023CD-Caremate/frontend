import { useEffect } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { IoMdStar, IoMdClose, IoMdStarOutline } from 'react-icons/io'
import { useReviewListStore } from '../store/store'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
}

const Header = styled.div`
  display: flex;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1.25rem;
  margin-left: 4.3rem;
`

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 62.5rem;
  margin: 0 auto;
  height: max-content;
  border-top: 2px solid #d8d8d8;
  border-bottom: 2px solid #d8d8d8;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
`

const Writer = styled.div`
  display: flex;
  font-size: 1.8rem;
  font-weight: bold;
`

const WriteDate = styled.div`
  display: flex;
  font-size: 1.5rem;
  color: #717171;
`

const StarWrap = styled.div`
  display: flex;
  margin: 1rem;
  margin-left: 0px;
`

const Title = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
`

const Content = styled.div`
  display: flex;
  font-size: 1.25rem;
  margin-top: 0.625rem;
`

function ReviewModal({ isOpen, onClose, userName }: ReviewModalProps) {
  const { reviewList } = useReviewListStore()

  useEffect(() => {}, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(181, 181, 181, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '1200px',
          maxHeight: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '20px',
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
      <Header>{userName}님의 리뷰</Header>
      {reviewList.map((review) => (
        <MainWrap>
          <Writer>{review.writer}</Writer>
          <WriteDate>{review.createAt}</WriteDate>
          <StarWrap>
            {/* 별점을 반올림하여 표시 */}
            {(() => {
              const roundedStar = Math.round(review.star)
              const stars = []
              for (let i = 0; i < 5; i++) {
                if (i < roundedStar) {
                  stars.push(<IoMdStar key={i} size={32} />)
                } else {
                  stars.push(<IoMdStarOutline key={i} size={32} />)
                }
              }
              return stars
            })()}
          </StarWrap>
          <Title>제목</Title>
          <Content>{review.content}</Content>
        </MainWrap>
      ))}
    </Modal>
  )
}

export default ReviewModal
