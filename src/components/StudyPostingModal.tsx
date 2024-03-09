import React, { useState } from 'react'
import styled from 'styled-components'

type Prop = {
  PostingCloseModal?: () => void
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
`

const Modal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 900px;
  height: 600px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 50px;
`

const Textarea = styled.textarea`
  width: 650px;
  height: 400px;
  border: 1px solid #dbdbdb;
  margin-bottom: 15px;
`

const BtnWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 200px;
`

const Btn = styled.div`
width: 80px;
height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
`

function StudyingPostingModal({ PostingCloseModal }: Prop) {
  return (
    <div>
      <Container>
          <Modal>
              <Title>오늘 스터디를 기록해보세요 </Title>
              <Textarea/>
              <BtnWrapper>
                <Btn onClick={PostingCloseModal}>완료</Btn>
                <Btn onClick={PostingCloseModal}>취소</Btn>
              </BtnWrapper>
          </Modal>
      </Container>
    </div>
  )
}

export default StudyingPostingModal
