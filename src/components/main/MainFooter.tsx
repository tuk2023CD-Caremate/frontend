import { styled } from 'styled-components'

const Container = styled.div`
  background-color: #e3e3e3;
  width: 100vw;
  height: 20vh;
  display: flex;
`

const Wraper = styled.div`
  display: flex;
  width: 80vw;
  height: 10vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const Text = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: bold;
  color: #858585;
  cursor: pointer;
`

function MainFooter() {
  return (
    <Container>
      <Wraper>
        <Text
          onClick={() => {
            window.open('https://www.termsfeed.com/live/1301ad52-4ab8-4ed9-aa9b-f93e9e23aa25')
          }}>
          개인정보 보호정책
        </Text>
      </Wraper>
    </Container>
  )
}

export default MainFooter
