import styled from 'styled-components'

interface StartNavProps {
  handleStart: () => void
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 3;
`
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  align-items: center;
  margin-bottom: 20px;
`

const PlaystoreBtn = styled.button`
  margin: 30px;
  border-radius: 15px;
  width: 260px;
  height: 70px;
  background-color: #650fa9;
  color: #ffffff;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`
const StartBtn = styled.button`
  margin: 30px;
  border-radius: 15px;
  width: 260px;
  height: 70px;
  background-color: #650fa9;
  color: #ffffff;
  font-weight: bold;
  font-size: 38px;
  text-align: center;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`

function StartNav({ handleStart }: StartNavProps) {
  return (
    <div>
      <Container>
        <Wrap>
          <PlaystoreBtn onClick={() => alert('준비 중입니다')}>PLAY STORE</PlaystoreBtn>
          <StartBtn onClick={handleStart}>시작하기</StartBtn>
        </Wrap>
      </Container>
    </div>
  )
}

export default StartNav
