import styled from 'styled-components'
import Modal from 'react-modal'
import { PiStar, PiStarFill } from 'react-icons/pi'
import { ChangeEvent, useState } from 'react'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const Header = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
`

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: 100%;
`

const Text = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #666666;
`

const Button = styled.button<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 150px;
  height: 40px;
  font-size: 24px;
  color: #650fa9;
  margin-left: 40px;
  border-radius: 10px;
  border: solid 1.5px #650fa9;
  background-color: ${(props) => (props.isActive ? '#e8dcf2' : 'transparent')};

  &:hover {
    background-color: #dcd6eb;
  }
`

const RateWrap = styled.div`
  display: flex;
  width: 700px;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`
const StarWrap = styled.div`
  display: flex;
`

const StarIcon = styled.div`
  cursor: pointer;
  margin: 10px;
`

const SolvedWrap = styled.div`
  display: flex;
  width: 700px;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`
const ButtonWrap = styled.div`
  display: flex;
`

const LikeWrap = styled.div`
  display: flex;
  width: 700px;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`

const InputTitle = styled.input`
  margin-top: 40px;
  margin: 20px;
  width: 700px;
  height: 60px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  background-color: #f6f6f6;
`

const InputContent = styled.textarea`
  width: 700px;
  height: 200px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  background-color: #f6f6f6;
  resize: none;
`

const ConfirmWrap = styled.div`
  display: flex;
  justify-content: center;
`
const RegisterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 28px;
  font-weight: bold;
  width: 110px;
  height: 60px;
  background-color: #e8dcf2;
  color: #650fa9;
  margin: 30px 20px 0px 20px;
`

const CancelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 28px;
  font-weight: bold;
  width: 110px;
  height: 60px;
  background-color: #ffffff;
  border: solid 1px #bdbdbd;
  color: #000000;
  margin: 30px 20px 0px 20px;
`

function CreateReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    rating: 0,
    isResolved: false,
    isLiked: false,
  })

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setPostData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleBooleanChange = (name: any, value: any) => {
    setPostData((prev: any) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '1200px',
          height: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '20px',
          borderColor: '#ffffff',
        },
      }}>
      <Header>매칭 후기를 작성해주세요</Header>
      <MainWrap>
        <RateWrap>
          <Text>평점을 남겨주세요 !</Text>
          <StarWrap>
            {[...Array(5)].map((_, index) =>
              index < postData.rating ? (
                <StarIcon key={index} onClick={() => handleBooleanChange('rating', index + 1)}>
                  <PiStarFill size={36} />
                </StarIcon>
              ) : (
                <StarIcon key={index} onClick={() => handleBooleanChange('rating', index + 1)}>
                  <PiStar size={36} />
                </StarIcon>
              ),
            )}
          </StarWrap>
        </RateWrap>
        <SolvedWrap>
          <Text>문제가 해결 되셨나요 ?</Text>
          <ButtonWrap>
            <Button
              isActive={postData.isResolved}
              onClick={() => handleBooleanChange('isResolved', true)}>
              해결 됬어요
            </Button>
            <Button
              isActive={!postData.isResolved}
              onClick={() => handleBooleanChange('isResolved', false)}>
              해결 못했어요
            </Button>
          </ButtonWrap>
        </SolvedWrap>
        <LikeWrap>
          <Text>매칭이 맘에 들었나요 ?</Text>
          <ButtonWrap>
            <Button
              isActive={postData.isLiked}
              onClick={() => handleBooleanChange('isLiked', true)}>
              네
            </Button>
            <Button
              isActive={!postData.isLiked}
              onClick={() => handleBooleanChange('isLiked', false)}>
              아니요
            </Button>
          </ButtonWrap>
        </LikeWrap>
        <InputTitle name="title" placeholder="제목을 적어주세요" onChange={handleInputChange} />
        <InputContent name="content" placeholder="내용을 적어주세요" onChange={handleInputChange} />
        <ConfirmWrap>
          <RegisterBtn>등록</RegisterBtn>
          <CancelBtn onClick={onClose}>취소</CancelBtn>
        </ConfirmWrap>
      </MainWrap>
    </Modal>
  )
}

export default CreateReviewModal
