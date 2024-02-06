import React, {useState} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import bubbleimg  from '../assets/images/bubble.png';

const GlobalStyle = createGlobalStyle`
* {
  font-family: "Pretendard";
  margin: 0;
  padding: 0;
}
body {
    background-color: #fff;
  }
 
`
const PostContainer = styled.div`
margin: 0 auto;
width: 1000px;
`

const Post = styled.div`
margin: 0 10%;

`

const SelectBox = styled.div`
display: flex;
justify-content: baseline;
margin: 25px 0;
`

const SelectBtn = styled.button`
width: 120px;
height: 40px;
font-size: 16px;
margin-right: 25px;
color: #bdbdbd;
background-color: #fff;
border: none;
&:hover,
  &:active {
    font-weight: bold;
    color: #650fa9;
    border-bottom: 2px solid #e8e8e8;
  }

&.category{
    font-weight: bold;
    color: #650fa9;
    border-bottom: 2px solid #e8e8e8;
}
`
const PostHeader = styled.div`
display: flex;
justify-content: baseline;
align-items: center;
`
const InterestsSelect = styled.select`
width: 80px;
height: 30px;
text-align: center;
margin-right: 70px;
font-size: 14px;
border-radius: 5px;
`
const Input = styled.input`
width: 400px;
height: 40px;
background-color: #fff;
border: 1px solid #bdbdbd;
border-radius: 5px;
text-indent: 20px;
font-size: 14px;
`
const PostBody = styled.div`
display: flex;
flex-direction:column;
margin-top: 20px;
`
const InputTitle = styled.input`
font-size: 32px;
font-weight: bold;
text-indent: 20px;
border: none;
background-color: #fff;
`
const TextareaBody = styled.textarea`
width: 750px;
height: 430px;
margin: 20px 0;
border: 1px solid #bdbdbd;
border-radius: 10px;
`
const PostFooter = styled.div`
display: flex;
justify-content: end;
margin-top: 10px;
`
const PostBtn = styled.button`
width: 80px;
height: 40px;
margin-right: 20px;
border-radius: 5px;
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
  

  

export default function MainPost() {
    const [category, SetCategory] = useState("")
    const [interests, SetInterests] = useState("")
    const [title, SetTitle] = useState("")
    const [content, SetContent] = useState("")
    const [clicked, SetClicked] = useState(false);


    const handleClick = () => {
        SetClicked(true);
      }
    const OnCategoryHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        SetCategory(e.target.value)
        
      }

    const OntitleHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        SetTitle(e.target.value)
      }

    const OnContentHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
        SetContent(e.target.value)
      }

    const OnInterestsHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetInterests(e.target.value)
  }



  return (
    <>
      <GlobalStyle />
      <PostContainer>
      <Post>
        <SelectBox>
        <SelectBtn className={clicked ? "category" : ""} onClick={handleClick}>
            자유 게시판
        </SelectBtn>
        <SelectBtn className={clicked ? "category" : ""} onClick={handleClick}>
            질문 게시판
        </SelectBtn>
        <SelectBtn>
            스터디 게시판
        </SelectBtn>
        </SelectBox>
        <PostHeader>
            <InterestsSelect value={interests} onChange={OnInterestsHandler}>
                {interestsList.map((item) => (
                    <option value={item.value} key={item.name}>
                    {item.name}
                    </option>
                ))}
            </InterestsSelect>
            <Input type="text" placeholder="관심분야를 더 자세하게 적어주세요"/>
        </PostHeader>
        <PostBody>
            <InputTitle type="text" placeholder="제목" value={title} onChange={OntitleHandler}/>
            <TextareaBody value={content} onChange={OnContentHandler}/>
        </PostBody>
        <PostFooter>
            <PostBtn >
                삭제
            </PostBtn>
            <PostBtn className="post">
                등록
            </PostBtn>
        </PostFooter>
      </Post>
      </PostContainer>
    </>
  )
}
