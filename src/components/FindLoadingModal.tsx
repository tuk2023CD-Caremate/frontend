import styled, { keyframes } from 'styled-components'
import LoadingImg from '../assets/images/loading.png'

const Container = styled.div`
  width: 56.25rem;
  height: 37.5rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 1.25rem 0.625rem rgba(0, 0, 0, 0.2);
`

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

const Text = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 6.25rem;
  color: #666666;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Loading = styled.img`
  margin-bottom: 6.25rem;
  animation: ${rotate} 2.5s linear infinite;
`

function FindLoadingModal() {
  return (
    <div>
      <Container>
        <Title>멘토를 찾고 있어요</Title>
        <Text>잠시만 기다려주세요</Text>
        <Loading src={LoadingImg} />
      </Container>
    </div>
  )
}

export default FindLoadingModal
