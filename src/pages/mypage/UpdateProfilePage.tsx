import Header from '../../components/Header.tsx'
import Profilebar from '../../components/sidebar/Profilebar.tsx'
import Navbar from '../../components/Navbar.tsx'
import styled from 'styled-components'
import axios from 'axios'
import { ChangeEvent, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useApiUrlStore, useProfileDataStore, getImageImageUrl} from '../../store/store.ts'
import defaultImg from '../../assets/images/profileimg.png'
//import { FaRegFileImage } from "react-icons/fa";


const Container = styled.div`
  display: flex;
  margin-top: 3rem;
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 25rem);
  min-height: 48.75rem;
  border-left: 1px solid #d8d8d8;
`

const Upper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: calc(100% - 12.5rem);
  padding-left: 3rem;
  padding-right: 4.375rem;
`

const ProfileContent = styled.div`
  margin: 0 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem;
  width: 36rem;
  min-height: 48rem;
`

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;;
`

const InfoContent = styled.div`
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
`

{/*
const Updload = styled.div`
  display: flex;
  align-items: center;
`*/}

const ProfileImg = styled.img`
width: 12rem;
height: 12rem;
border-radius: 50%;
margin: 1rem;
`

const Label = styled.label`
font-weight: bold;
font-size: 1.25rem;
margin-left: 0.5rem;
margin-top: 0.5rem;
color: bdbdbd;
`

const Profile = styled.input`
display: none;
`

const Role = styled.select`
 display: flex;
  width: 370px;
  height: 48px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  text-indent: 1rem;
  font-weight: 300;
`


const Update = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
  height: 3rem;
  border-radius: 5px;
  border: 0.5px solid #bdbdbd;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  margin-top: 1.25rem;
  cursor: pointer;
`

const Lower = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`

const ReviewContent = styled.div`
  margin: 1.25rem 1.25rem 2rem 1.25rem;
  display: flex;
  flex-direction: column;
`
const MatchingContent = styled.div`
  margin: 1.25rem;
  display: flex;
  flex-direction: column;
`
const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.625rem;
`
const Category = styled.div`
  border-bottom: 1px solid #e8e8e8;
  font-size: 2rem;
  font-weight: bold;
  width: 25rem;
  margin-left: -1.25rem;
  padding-bottom: 0.625rem;
  font-weight: 600;
`
const Title = styled.div`
  width: 8rem;
  font-size: 1.55rem;
  font-weight: bold;
  margin-right: 1.25rem;
`

const Detail = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  
`

const EditInput = styled.input`
  display: flex;
  width: 370px;
  height: 48px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  text-indent: 1rem;
`


const partList = [
  { value: 'MENTOR', name: 'MENTOR' },
  { value: 'MENTEE', name: 'MENTEE' },
]


function UpdateProfilePage() {
  const { apiUrl } = useApiUrlStore()
  const { profileData, setProfileData } = useProfileDataStore()
 

  //프로필 수정
  const [name, setName] = useState(profileData.name)
  const [part, setPart] = useState(profileData.part)
  const [nickname, setNickName] = useState(profileData.nickname)
  const [blogUrl, setBlogUrl] = useState(profileData.blogUrl)
  const [pr, setPr] = useState(profileData.publicRelations)
  const [interests, setInterests] = useState(profileData.interests)
  const [expertiseField, setExpertiseField] = useState(profileData.expertiseField)
  const [job, setJob] = useState(profileData.job)
  const profileImg = getImageImageUrl(profileData.imageUrl, defaultImg);




  const getProfile = async () => {
    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setProfileData(response.data)
      console.log(response.data.imageUrl)
    } catch (error) {}
  }

  useEffect(() => {
    getProfile()
  }, [])



   //프로필수정
   const updateProfile = async() => {
    const editprofile = {
      name: name,
      part: part,
      nickname : nickname,
      blogUrl : blogUrl,
      publicRelations: pr,
      interests :interests,
      expertiseField: expertiseField,
      job: job
    }

    try {
      const access = localStorage.getItem('accessToken')
      const response = await axios.put(`${apiUrl}/user`, editprofile, {
        headers: { Authorization: `Bearer ${access}` },
      })
      setProfileData(response.data)
      alert('수정되었습니다')
    } catch (error) {}
   }


   //프로필 사진 업로드
   const postProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
        let selectedFile = e.target.files?.[0] || defaultImg; 
        const formData = new FormData();
        formData.append('image', selectedFile);

        const access = localStorage.getItem('accessToken');
        const response = await axios.put(
          'http://studymate154.com:8080/api/image/upload', formData,
          {
            headers: {
              Authorization: `Bearer ${access}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setProfileData({ ...profileData, imageUrl: response.data.s3Url});
        console.log('프로필 이미지가 업로드 되었습니다');
    
      }
     catch (error) {
      console.error('프로필 이미지 업로드에 실패했습니다:', error);
    }
  };

  useEffect(() => {
    getProfile()
  }, [])

  

   return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Profilebar />
          <ProfileWrapper>
            <Upper>
              <ProfileContent>
                    <NameWrapper>
                      <ProfileImg src={profileImg}/>
                      <Label htmlFor='profileimg'> 프로필 이미지 업로드</Label>
                      <Profile type='file' accept='image/*' id='profileimg' onChange={postProfileImg} />
                    </NameWrapper>
                    <InfoContent>
                        <Content>
                          <Title>닉네임</Title>
                          <EditInput
                          type='text'
                          value={nickname}
                          placeholder={profileData.nickname}
                          onChange={(e) => setNickName(e.target.value)}
                          />
                        </Content>
                        <Content>
                        <Title>역할</Title>
                        <Role name="part" value={profileData.part} onChange={(e) => setPart(e.target.value)}>
                          {partList.map((item) => (
                          <option value={item.value} key={item.name}>
                            {item.name}
                          </option>
                          ))}
                        </Role>
                        </Content>
                      <Content>
                      <Title>이름</Title>
                        <EditInput
                        type='text'
                        value={name}
                        placeholder={profileData.name}
                        onChange={(e) => setName(e.target.value)}
                        />
                      </Content>
                      <Content>
                        <Title>상세분야</Title>
                        <EditInput
                        type='text'
                        value={interests}
                        placeholder={profileData.interests}
                        onChange={(e) => setInterests(e.target.value)}
                        />
                      </Content>
                      <Content>
                        <Title>전문분야</Title>
                        <EditInput
                        type='text'
                        value={expertiseField}
                        placeholder={profileData.expertiseField}
                        onChange={(e) => setExpertiseField(e.target.value)}
                        />
                      </Content>
                      <Content>
                        <Title>직업</Title>
                        <EditInput
                        type='text'
                        value={job}
                        placeholder={profileData.job}
                        onChange={(e) => setJob(e.target.value)}
                        />
                      </Content>
                      <Content>
                        <Title>PR</Title>
                        <EditInput
                        type='text'
                        value={pr}
                        placeholder={profileData.publicRelations}
                        onChange={(e) => setPr(e.target.value)}
                        />
                      </Content>
                      <Content>
                        <Title>Blog</Title>
                        <EditInput
                        type='text'
                        value={blogUrl}
                        placeholder={profileData.blogUrl}
                        onChange={(e) => setBlogUrl(e.target.value)}
                        />
                      </Content>
                    </InfoContent>
              </ProfileContent>
              <Lower>
                <ReviewContent>
                  <Category>리뷰</Category>
                  <Content>
                    <Title>좋아요</Title>
                    <Detail>{profileData.heart}</Detail>
                  </Content>
                  <Content>
                    <Title>평점</Title>
                    <Detail>{profileData.starAverage}</Detail>
                  </Content>
                </ReviewContent>
                <MatchingContent>
                  <Category>매칭기록</Category>
                  <Content>
                    <Title>문제 해결</Title>
                    <Detail>{profileData.solved}</Detail>
                  </Content>
                  <Content>
                    <Title>매칭 수</Title>
                    <Detail>{profileData.matchingCount}</Detail>
                  </Content>
                </MatchingContent>
              </Lower>
              <Link to="/mypage">
              <Update onClick={updateProfile}>수정완료</Update>
              </Link>
            </Upper>
          </ProfileWrapper>
      </Container>
    </div>
  );
};

export default UpdateProfilePage
