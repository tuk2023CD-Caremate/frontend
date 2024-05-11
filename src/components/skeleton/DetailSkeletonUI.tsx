import styled, { keyframes } from "styled-components";

// Skeleton 애니메이션 키프레임
const loadingAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// 애니메이션 적용
const SkeletonItem = styled.span<{ width: string, height: string }>`
  display: block;
  height: ${props => props.height};
  background: linear-gradient(90deg, #e8e8e8, #f5f5f5, #e8e8e8);
  background-size: 200% 100%;
  animation: ${loadingAnimation} 2s infinite;
  width: ${props => props.width};
  border-radius: 4px;
`;

const SkeletonWrapper = styled.div`
display: flex;
flex-direction: column;
width: 400px;
height: 230px;
padding: 20px 0px 0px 20px;
`
const SkeletonUpper = styled.div`
display: flex;
`;

const SkeletonProfile = styled.div`
border-radius: 50px;
`;

const SkeletonInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 20px;
`

const SkeletonName = styled.div`
margin-bottom: 10px;
`;

const SkeletonTime = styled.div`
width: 450px;
`;

const SkeletonTitle = styled.div`
  margin-top: 30px;
`;

const SkeletonContent = styled.div`
margin-top: 10px;
`;





// 스켈레톤 UI 컴포넌트
function DetailSkeletonUI() {
  return (
    <SkeletonWrapper>
        <SkeletonUpper>
            <SkeletonProfile>
                <SkeletonItem width="80px" height="80px"></SkeletonItem>
            </SkeletonProfile>
            <SkeletonInfo>
                <SkeletonName>
                    <SkeletonItem width="150px" height="40px"></SkeletonItem>
                </SkeletonName>
                <SkeletonTime>
                    <SkeletonItem width="70px" height="20px"></SkeletonItem>
                </SkeletonTime>
            </SkeletonInfo>
        </SkeletonUpper>
        <SkeletonTitle>
          <SkeletonItem width="350px" height="40px"></SkeletonItem>
        </SkeletonTitle>
        <SkeletonContent>
          <SkeletonItem width="300px" height="30px"></SkeletonItem>
        </SkeletonContent>
    </SkeletonWrapper>
  );
}

export default DetailSkeletonUI;