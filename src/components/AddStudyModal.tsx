import React, { useState } from 'react'
import styled from 'styled-components'

type Prop = {
  AddCloseModal?: () => void
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
const Close = styled.div`
 width: 40px;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 25px;
 margin-left: 90%;
 margin-top: 10px;
 cursor: pointer;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
`

const Textarea = styled.textarea`
  width: 650px;
  height: 400px;
  border: 1px solid #dbdbdb;
  margin-bottom: 20px;
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

function AddStudyModal({ AddCloseModal }: Prop) {
  return (
    <div>
      <Container>
          <Modal>
            <Close onClick={AddCloseModal}>X</Close>
              <Title>작성한 스터디 기록 </Title>
              <Textarea/>
              <BtnWrapper>
                <Btn onClick={AddCloseModal}>수정</Btn>
                <Btn>삭제</Btn>
              </BtnWrapper>
          </Modal>
      </Container>
    </div>
  )
}

export default AddStudyModal

