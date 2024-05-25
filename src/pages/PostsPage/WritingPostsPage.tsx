import { useState } from 'react'
import styled from 'styled-components'
import Header2 from '../../components/Header2.tsx'
import { useNavigate } from 'react-router-dom'
import { useApiUrlStore } from '../../store/store.ts'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 45rem);
  height: calc(100vh - 10rem);
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  padding: 0 6.25rem 0 6.25rem;
`

const Upper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  padding: 1rem;
`

const SelectBtn = styled.button`
  width: 16rem;
  height: 4rem;
  font-size: 2rem;
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
  align-items: center;
  padding: 1rem;;
`
const InterestsSelect = styled.select`
  width: 10rem;
  height: 4rem;
  text-align: center;
  margin-right: 5rem;
  font-size: 1.5rem;
  font-weight: bolder;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.625rem;
  border: 1px solid #d8d8d8;
  color: #650fa9;
`
const Input = styled.input`
  width: 43rem;
  height: 4rem;
  text-indent: 1.25rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 0.625rem;
  border: 1px solid #d8d8d8;
  &::placeholder {
    color: #bdbdbd;
  }
`

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 62.5rem;
  padding: 1rem;
`
const PostTitle = styled.input`
  flex:1;
  font-size: 3rem;
  font-weight: bold;
  border: 1px solid #d8d8d8;
  text-indent: 1.5rem;
  &::placeholder {
    color: #bdbdbd;
  }
`
const PostContent = styled.textarea`
  font-size: 1.75rem;
  flex: 8;
  border: 1px solid #d8d8d8;
  resize: none;
  padding: 25px;
  &::placeholder {
    color: #bdbdbd;
  }
`
const FooterWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
  margin-top: 2rem;
`
const PostBtn = styled.button`
  font-size: 1.75rem;
  width: 10rem;
  height: 4rem;
  margin-left: 1.25rem;
  border-radius: 0.625rem;
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
