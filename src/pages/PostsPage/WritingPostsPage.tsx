import { useState } from 'react'
import styled from 'styled-components'
import Header2 from '../../components/Header2.tsx'
import { useNavigate } from 'react-router-dom'
import { useApiUrlStore } from '../../store/store.ts'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 600px);
  height: 950px;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  padding: 0 100px 0 100px;
`

const Upper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: baseline;
  padding: 10px;
`

const SelectBtn = styled.button`
  width: 250px;
  height: 50px;
  font-size: 32px;
  color: #bdbdbd;
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #e8e8e8;
  &:hover,
  &:active,
  &.category {
    font-weight: bold;
    color: #650fa9;
    border-bottom: 2px solid #bdbdbd;
  }
`
const SerchWrapper = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
  padding: 10px;
  margin: 15px 0 15px 0;
`
const InterestsSelect = styled.select`
  width: 165px;
  height: 60px;
  text-align: center;
  margin-right: 80px;
  font-size: 28px;
  font-weight: bolder;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  color: #650fa9;
`
const Input = styled.input`
  width: 700px;
  height: 65px;
  text-indent: 20px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  &::placeholder {
    color: #bdbdbd;
  }
`

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 10px;
`
const PostTitle = styled.input`
  height: 103px;
  font-size: 44px;
  font-weight: bold;
  border: 1px solid #d8d8d8;
  text-indent: 25px;
  &::placeholder {
    color: #bdbdbd;
  }
`
const PostContent = styled.textarea`
  font-size: 28px;
  height: 517px;
  border: 1px solid #d8d8d8;
  resize: none;
  padding: 25px;
  &::placeholder {
    color: #bdbdbd;
  }
`
const FooterWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`
const PostBtn = styled.button`
  font-size: 28px;
  width: 150px;
  height: 60px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: #ececec;
  color: #787878;
  font-weight: bolder;
  &.post {
    color: #fff;
    background-color: #650fa9;
  }
`
const interestsList = [
  { value: 'WEBAPP', name: '웹/앱개발' },
  { value: 'SERVER', name: '서버/네트워크' },
  { value: 'AI', name: 'AI/IoT' },
  { value: 'DATA', name: '데이터 개발' },
  { value: 'SECURITY', name: '정보보안' },
]

export default function WritingPostPage() {
  const [title, SetTitle] = useState('')
  const [content, SetContent] = useState('')
  const [interests, SetInterests] = useState('관심분야')
  const [category, SetCategory] = useState('')
  const { apiUrl } = useApiUrlStore()
  const navigate = useNavigate()

  const CreatePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const postData = {
      title: title,
      content: content,
      category: category,
      interests: interests,
      recruitmentStatus: true,
    }
    if (category === '' || interests === '' || title === '' || content === '') {
      alert(' 입력정보를 다시 확인해주세요.')
      return
    }

    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.post(`${apiUrl}/posts`, postData, {
        headers: { Authorization: `Bearer ${access}` },
      })
      navigate('/posts')
      console.log(response.data)
    } catch (error) {
      alert('error')
    }
  }

  const BacktoPost = () => {
    navigate('/posts')
  }

  return (
    <div>
      <Header2 />
      <Container>
        <AllWrapper>
          <Upper>
            <ButtonWrapper>
              <SelectBtn
                className={`btn ${category === 'FREE' ? 'category' : ''}`}
                onClick={() => {
                  SetCategory('FREE')
                }}
                value={category}>
                자유게시판
              </SelectBtn>
              <SelectBtn
                className={`btn ${category === 'QUESTION' ? 'category' : ''}`}
                onClick={() => {
                  SetCategory('QUESTION')
                }}
                value={category}>
                질문게시판
              </SelectBtn>
              <SelectBtn
                className={`btn ${category === 'STUDY' ? 'category' : ''}`}
                onClick={() => {
                  SetCategory('STUDY')
                }}
                value={category}>
                스터디게시판
              </SelectBtn>
            </ButtonWrapper>
            <SerchWrapper>
              <InterestsSelect value={interests} onChange={(e) => SetInterests(e.target.value)}>
                <option disabled hidden>
                  관심분야
                </option>
                {interestsList.map((item) => (
                  <option value={item.value} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </InterestsSelect>
              <Input type="text" placeholder="자세한 관심분야를 태그로 작성해주세요!"></Input>
            </SerchWrapper>
          </Upper>
          <PostWrapper>
            <PostTitle
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => SetTitle(e.target.value)}
            />
            <PostContent
              placeholder="게시글 내용을 적어주세요"
              value={content}
              onChange={(e) => SetContent(e.target.value)}
            />
            <FooterWrapper>
              <PostBtn onClick={BacktoPost}>취소</PostBtn>
              <PostBtn className="post" onClick={CreatePost}>
                등록
              </PostBtn>
            </FooterWrapper>
          </PostWrapper>
        </AllWrapper>
      </Container>
    </div>
  )
}
