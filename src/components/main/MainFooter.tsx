import { styled } from 'styled-components'

const Container = styled.div`
  background-color: #e3e3e3;
  width: 100vw;
  height: 22vh;
  display: flex;
`

const Wraper = styled.div`
  display: flex;
  width: 90vw;
  height: 10vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`
const InfoWrap = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 400;
  color: #858585;
  text-align: center;
  margin-top: 20px;
  align-items: center;
`

const Divider_V = styled.div`
  height: 20px;
  border: 2px solid #d8d8d8;
  margin: 10px;
`

const Divider = styled.div`
  width: 100%;
  border: 2px solid #d8d8d8;
  margin: 10px;
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
        <InfoWrap>
          스터디메이트 대표 장희수
          <Divider_V />
          주소 : 서울특별시 노원구 중계로 230
          <Divider_V />
          사업자 등록번호 : 244-05-02961
        </InfoWrap>
        <Divider />
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
