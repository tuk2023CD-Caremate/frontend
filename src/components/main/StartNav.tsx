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
  margin-bottom: 1.25rem;
`

const PlayStoreBtn = styled.button`
  margin: 1.8rem;
  border-radius: 1rem;
  width: 16.25rem;
  height: 4.375rem;
  background-color: #650fa9;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.8rem;
  text-align: center;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`
const StartBtn = styled.button`
  margin: 1.8rem;
  border-radius: 1rem;
  width: 16.25rem;
  height: 4.375rem;
  background-color: #650fa9;
  color: #ffffff;
  font-weight: bold;
  font-size: 2.3rem;
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
          <PlayStoreBtn
            onClick={() =>
              window.open(
                'https://play.google.com/store/apps/details?id=com.studymate154.studymate',
              )
            }>
            PLAY STORE
          </PlayStoreBtn>
          <StartBtn onClick={handleStart}>시작하기</StartBtn>
        </Wrap>
      </Container>
    </div>
  )
}

export default StartNav
