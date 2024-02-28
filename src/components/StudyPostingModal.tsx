import React, { useState } from 'react'
import styled from 'styled-components'

type Prop = {
  CloseModal?: () => void
}

const Container = styled.div`
display: flex;
justify-content: center;
`

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 900px;
  height: 600px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 50px;
`

const Textarea = styled.textarea``

const Btn = styled.div``

function StudyingPostingModal({ CloseModal }: Prop) {

  return (
    <div>
      <Container>
        <Modal>
          <Title>오늘 스터디를 기록해보세요 </Title>
    
          <Btn onClick={CloseModal}>닫기</Btn>
        </Modal>
      </Container>
    </div>
  )
}

export default StudyingPostingModal
