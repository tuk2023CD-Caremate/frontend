import styled from 'styled-components'

interface StartNavProps {
  handleStart: () => void
}

const PlaystoreBtn = styled.button`
  position: fixed;
  left: 800px;
  bottom: 70px;
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
  position: fixed;
  left: 1120px;
  bottom: 70px;
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
      <PlaystoreBtn onClick={() => alert('준비 중입니다')}>PLAY STORE</PlaystoreBtn>
      <StartBtn onClick={handleStart}>시작하기</StartBtn>
    </div>
  )
}

export default StartNav
