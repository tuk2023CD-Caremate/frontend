import styled, { keyframes } from 'styled-components'
import LoadingImg from '../assets/images/loading.png'

const Container = styled.div`
  width: 900px;
  height: 600px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
`

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
`

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 100px;
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
  margin-bottom: 100px;
  animation: ${rotate} 2.5s linear infinite;
`

function MatchingLoadingModal() {
  return (
    <div>
      <Container>
        <Title>온라인 매칭을 시작할게요</Title>
        <Text>잠시만 기다려주세요</Text>
        <Loading src={LoadingImg} />
      </Container>
    </div>
  )
}

export default MatchingLoadingModal
