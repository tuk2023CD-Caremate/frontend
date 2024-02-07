import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 255px);
  height: 109px;
  padding-left: 143px;
  padding-right: 143px;
  border: 2px solid;
`

export default function MypageBar() {
  return <Container></Container>
}
