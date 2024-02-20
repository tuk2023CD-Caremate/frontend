import React, {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Container = styled.div`
display: flex;
justify-content: center;
margin: 30px 100px 30px 100px;
`

const AllWrapper = styled.div`
display: flex;
flex-direction: column;
width: calc(100% - 400px);
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
    border-bottom: 2px solid #BDBDBD;
  }
`
const SerchWrapper = styled.div`
display: flex;
justify-content: baseline;
align-items: center;
padding: 10px;
`
const InterestsSelect = styled.select`
width: 165px;
height: 60px;
text-align: center;
margin-right: 80px;
font-size: 28px;
border-radius: 5px;
`
const Input = styled.input`
width: 700px;
height: 65px;
text-indent: 20px;
margin-right: 80px;
font-size: 24px;
font-weight: bold;
border-radius: 5px;

&::placeholder {
    color: #bdbdbd;
  }
`

const PostWrapper = styled.div`
display: flex;
flex-direction:column;
margin-top: 10px;
`
const PostTitle = styled.input`
height: 105px;
font-size: 64px;
font-weight: bold;
text-indent: 20px;
border: 1px solid #D8D8D8;
`
const PostContent = styled.textarea`
font-size: 28px;
height: 500px;
border: 1px solid #D8D8D8;
`
const FooterWrapper = styled.div`
display: flex;
justify-content: end;
margin-top: 40px;
`
const PostBtn = styled.button`
font-size: 28px;
width: 150px;
height: 60px;
margin-left: 20px;
border-radius: 10px;
border: 1px solid #bdbdbd;
&.post{
    color:#fff;
    background-color: #650fa9;
}
`
const interestsList =[
    { value: "KOREAN", name: "국어"},
    { value: "MATH", name: "수학"},
    { value: "ENGLISH", name: "영어"},
    { value: "SCIENCE", name: "과학"},
    { value: "PROGRAMMING", name: "코딩"},
  ];
  

export default function WritingPostPage() {
  const [title, SetTitle] = useState("")
  const [content, SetContent] = useState("")
  const [interests, SetInterests] = useState("")
  const [category, SetCategory] = useState<string>('FREE');

  const navigate = useNavigate()

  const OnTitleHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetTitle(e.target.value)
  }
  const OnContentHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetContent(e.target.value)
  }
  const OnIntereststHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetInterests(e.target.value)
  }


  const PostUpload = async (e: { preventDefault: () => void })  => {
    e.preventDefault()
    if (
      category === '' ||
      interests === '' ||
      title === '' ||
      content === '' 
    ) {
      alert(' 입력정보를 다시 확인해주세요.')
      return
    }

    try{
      const response = await axios.post('http://localhost:8080/api/posts', {
        category: category,
        interests: interests,
        title: title,
        content: content,
        recruitmentsStatus : false //스터디 모집여부에 대해 true,false -> 글작성할 때는 무조건 모집완료가 아니므로 false로 지정해놨는데 맞을까..
      })
      navigate('/posts')
    }
    catch(error){
      alert('error')
    }
  }


  const BacktoPost = () => {
    navigate('/posts');
  }

  return (
    <div>
      <Container>
        <AllWrapper>
          <Upper>
            <ButtonWrapper>
              <SelectBtn className={`btn ${category==='FREE' ? 'category':''}`}
              onClick={()=>SetCategory('FREE')} value={category}>
                자유게시판
              </SelectBtn>
              <SelectBtn className={`btn ${category==='QUESTIONS' ? 'category':''}`}
              onClick={()=>SetCategory('QUESTIONS')} value={category}>
                질문게시판
              </SelectBtn>
              <SelectBtn className={`btn ${category==='STUDY' ? 'category':''}`}
              onClick={()=>SetCategory('STUDY')} value={category}>
                스터디게시판
              </SelectBtn>
            </ButtonWrapper>
            <SerchWrapper>
              <InterestsSelect value={interests} onChange={OnIntereststHandler}>
                {interestsList.map((item) => (
                <option value={item.value} key={item.name}>
                  {item.name}
                  </option>
                  ))}
              </InterestsSelect>
              <Input type='text' placeholder='자세한 관심분야를 태그로 작성해주세요!'></Input>
            </SerchWrapper>
          </Upper>
            <PostWrapper>
            <PostTitle type="text" placeholder="제목" value={title} onChange={OnTitleHandler}/>
            <PostContent placeholder='게시글 내용을 입력하세요' value={content} onChange={OnContentHandler}/>
            <FooterWrapper>
              <PostBtn onClick={BacktoPost}>취소</PostBtn>
              <PostBtn className="post" onClick={PostUpload}>등록</PostBtn>
            </FooterWrapper>
          </PostWrapper>
      </AllWrapper>
    </Container>
  </div>
  )
}
