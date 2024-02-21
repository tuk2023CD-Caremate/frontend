import React, { useState } from 'react'
import styled from 'styled-components'
import UserImg from '../assets/images/profile.png'
import AccordionBtnImg from '../assets/images/accordionBtn.png'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

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
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 70px;
`

const SelectWrap = styled.div`
  display: flex;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  width: 750px;
  height: 75px;
  align-items: center;
  justify-content: space-between;
`

const Box = styled.div`
  display: flex;
  width: 850px;
  font-size: 30px;
  align-items: center;
`

const UserImage = styled.img``

const UserRole = styled.div`
  font-size: 26px;
  margin: 5px;
  font-weight: bold;
`
const UserNickname = styled.div`
  font-size: 26px;
  margin: 5px;
`
const UserInterests = styled.div`
  font-size: 20px;
  margin: 5px;
  font-weight: bold;
  color: #650fa9;
  margin-left: 20px;
`
const FindAgain = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8dcf2;
  color: #650fa9;
  width: 100px;
  height: 50px;
  justify-content: center;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
  margin-top: 70px;
`

function SelectUserModal() {
  const mentors = [
    { id: 1, role: '멘토', nickname: '김선재님', interests: '프로그래밍' },
    { id: 2, role: '멘토', nickname: '정우혁님', interests: '프로그래밍' },
    { id: 3, role: '멘티', nickname: '최지혜님', interests: '프로그래밍' },
  ]

  return (
    <div>
      <Container>
        <Title>멘토를 선택해주세요</Title>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box>
                  {' '}
                  <UserImage src={UserImg} />
                  <UserRole>멘토</UserRole>
                  <UserNickname>정우혁</UserNickname>
                  <UserInterests>프로그래밍</UserInterests>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box>
                  {' '}
                  <UserImage src={UserImg} />
                  <UserRole>멘토</UserRole>
                  <UserNickname>김선재</UserNickname>
                  <UserInterests>프로그래밍</UserInterests>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <FindAgain>다시 찾기</FindAgain>
      </Container>
    </div>
  )
}

export default SelectUserModal
