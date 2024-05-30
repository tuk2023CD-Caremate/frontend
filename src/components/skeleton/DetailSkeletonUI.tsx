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
width: 25rem;
height: 14.3rem;
padding: 1.25rem 0rem 0rem 1.25rem;
`
const SkeletonUpper = styled.div`
display: flex;
`;

const SkeletonProfile = styled.div`
border-radius: 3rem;
`;

const SkeletonInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 1.25rem;
`

const SkeletonName = styled.div`
margin-bottom: 0.625rem;
`;

const SkeletonTime = styled.div`
width: 28rem;
`;

const SkeletonTitle = styled.div`
  margin-top: 1.8rem;
`;

const SkeletonContent = styled.div`
margin-top: 0.625rem;
`;





// 스켈레톤 UI 컴포넌트
function DetailSkeletonUI() {
  return (
    <SkeletonWrapper>
        <SkeletonUpper>
            <SkeletonProfile>
                <SkeletonItem width="5rem" height="5rem"></SkeletonItem>
            </SkeletonProfile>
            <SkeletonInfo>
                <SkeletonName>
                    <SkeletonItem width="9.3rem" height="2.5rem"></SkeletonItem>
                </SkeletonName>
                <SkeletonTime>
                    <SkeletonItem width="4.3rem" height="1.25rem"></SkeletonItem>
                </SkeletonTime>
            </SkeletonInfo>
        </SkeletonUpper>
        <SkeletonTitle>
          <SkeletonItem width="22rem" height="2.5rem"></SkeletonItem>
        </SkeletonTitle>
        <SkeletonContent>
          <SkeletonItem width="18.75rem" height="1.8rem"></SkeletonItem>
        </SkeletonContent>
    </SkeletonWrapper>
  );
}

export default DetailSkeletonUI;