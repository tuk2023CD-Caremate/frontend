{/*
import {useState,useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

interface postsData {
    title: string
    content: string
  }

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
  

function WritingPostPage() {
  const [title, SetTitle] = useState('')
  const [content, SetContent] = useState('')
  const [interests, SetInterests] = useState('')
  const [category, SetCategory] = useState('')
  const navigate = useNavigate()
  const {id} = useParams()

const[postsdata, setpostsData] = useState<postsData>({
    title: '',
    content: '',
});

const updatedata = {
    title: title,
    content: content,
    category: category,
    interests: interests,
    recruitmentStatus : true
      };

    const onChange = async (e: { target: { value: React.SetStateAction<string> } }) => {
    const { value, name } = e.target; //event.target에서 name과 value만 가져오기
    setpostsData({
        ...postsdata,
        [name]: value,
    });
    };

    const getPost = async () => {
        try {
          const access = localStorage.getItem('accessToken')
          const response = await axios.get(`http://studymate-tuk.kro.kr:8080/api/posts`, {
            headers: { Authorization: `Bearer ${access}` },
          })
          setpostsData(response.data)
        } catch (error) {}
      }
    
      useEffect(() => {
        getPost()
      }, [])


      const UpdatePost = async () => {
        const access = localStorage.getItem('accessToken')
        const response = await axios.put(`http://studymate-tuk.kro.kr:8080/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setpostsData(response.data)
      navigate('post/:id');
      };



  const BacktoPost = () => {
    navigate('/posts/:id');
  }

  return (
    <div>
      <Container>
        <AllWrapper>
          <Upper>
            <ButtonWrapper>
              <SelectBtn className={`btn ${category==='FREE' ? 'category':''}`}
              onClick={()=>{SetCategory('FREE');}} name="category" value={category}>
                자유게시판
              </SelectBtn>
              <SelectBtn className={`btn ${category==='QUESTION' ? 'category':''}`}
              onClick={()=>{SetCategory('QUESTION');}}  name="category" value={category}>
                질문게시판
              </SelectBtn>
              <SelectBtn className={`btn ${category==='STUDY' ? 'category':''}`}
              onClick={()=>{SetCategory('STUDY');}}  name="category" value={category}>
                스터디게시판
              </SelectBtn>
            </ButtonWrapper>
            <SerchWrapper>
              <InterestsSelect  name="interests" value={interests} onChange={onCh(e) => SetInterests(e.target.value)}>
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
            <PostTitle type="text" placeholder="제목" value={title} onChange={(e) => SetTitle(e.target.value)}/>
            <PostContent placeholder='게시글 내용을 입력하세요' value={content} onChange={(e) => SetContent(e.target.value)}/>
            <FooterWrapper>
              <PostBtn onClick={BacktoPost}>취소</PostBtn>
              <PostBtn className="post" onClick={UpdatePost}>수정</PostBtn>
            </FooterWrapper>
          </PostWrapper>
      </AllWrapper>
    </Container>
  </div>
  )
}

export default WritingPostPage
*/}