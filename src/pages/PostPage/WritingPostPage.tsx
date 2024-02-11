import React, {useState} from 'react';
import styled from 'styled-components';


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
  &:active {
    font-weight: bold;
    color: #650fa9;
    border-bottom: 2px solid #BDBDBD;
  }

&.category{
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
width: 710px;
height: 70px;
background-color: #fff;
border: 1px solid #bdbdbd;
border-radius: 5px;
text-indent: 20px;
font-size: 24px;
`
const PostWrapper = styled.div`
display: flex;
flex-direction:column;
margin-top: 20px;
`
const InputTitle = styled.input`
height: 105px;
font-size: 64px;
font-weight: bold;
text-indent: 20px;
background-color: #fff;
border: 1px solid #D8D8D8;
`
const TextareaBody = styled.textarea`
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
margin-right: 20px;
border-radius: 10px;
border: 1px solid #bdbdbd;
background-color: #fff;
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
    const [interests, SetInterests] = useState("")
    const [clicked, SetClicked] = useState<string>('FREE');


    const OnInterestsHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    SetInterests(e.target.value)
  }



  return (
    <div>
      <Container>
        <AllWrapper>
          <Upper>
        <ButtonWrapper>
          <SelectBtn className={`btn ${clicked==='FREE' ? 'category':''}`}
          onClick={()=>SetClicked('FREE')}>
            자유게시판
          </SelectBtn>
          <SelectBtn className={`btn ${clicked==='QUESTIONS' ? 'category':''}`}
          onClick={()=>SetClicked('QUESTIONS')}>
            자유게시판
          </SelectBtn>
          <SelectBtn className={`btn ${clicked==='STUDY' ? 'category':''}`}
          onClick={()=>SetClicked('STUDY')}>
            자유게시판
          </SelectBtn>
        </ButtonWrapper>
        <SerchWrapper>
          <InterestsSelect value={interests} onChange={OnInterestsHandler}>
            {interestsList.map((item) => (
            <option value={item.value} key={item.name}>
              {item.name}
              </option>
              ))}
          </InterestsSelect>
          <Input type="text" placeholder="관심분야를 더 자세하게 적어주세요"/>
        </SerchWrapper>
        </Upper>
        <PostWrapper>
          <InputTitle type="text" placeholder="제목"/>
          <TextareaBody placeholder='게시글 내용을 입력하세요'/>
          <FooterWrapper>
            <PostBtn>삭제</PostBtn>
            <PostBtn className="post">등록</PostBtn>
          </FooterWrapper>
        </PostWrapper>
      </AllWrapper>
    </Container>
  </div>
  )
}
