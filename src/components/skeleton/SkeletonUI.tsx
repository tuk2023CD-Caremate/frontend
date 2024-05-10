import React from "react";
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
const SkeletonItem = styled.span<{ width: string }>`
  display: block;
  height: 35px;
  background: linear-gradient(90deg, #e8e8e8, #f5f5f5, #e8e8e8);
  background-size: 200% 100%;
  animation: ${loadingAnimation} 2s infinite;
  width: ${props => props.width};
  border-radius: 4px;
`;

const SkeletonWrapper = styled.div`
display: flex;
flex-direction: column;
width: calc(100% - 100px);
height: 200px;
border: 1px solid #d8d8d8;
padding: 20px 0px 0px 20px;
`

const SkeletonTitle = styled.div`
width: 200px;
`;

const SkeletonContent = styled.div`
  width: 350px;
  margin-top: 30px;
`;

const SkeletonFooter = styled.div`
width: 450px;
  margin-top: 20px;

`;



// 스켈레톤 UI 컴포넌트
function SkeletonUI() {
  const skeletons = [];
  for (let i = 0; i < 5; i++) {
    skeletons.push(
      <SkeletonWrapper key={i}>
        <SkeletonTitle>
          <SkeletonItem width="100%"></SkeletonItem>
        </SkeletonTitle>
        <SkeletonContent>
          <SkeletonItem width="100%"></SkeletonItem>
        </SkeletonContent>
        <SkeletonFooter>
          <SkeletonItem width="100%"></SkeletonItem>
        </SkeletonFooter>
      </SkeletonWrapper>
    );
  }
  return <>{skeletons}</>;
}

export default SkeletonUI;
