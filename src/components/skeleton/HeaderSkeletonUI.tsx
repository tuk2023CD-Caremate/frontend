import styled, { keyframes } from 'styled-components'

// Skeleton 애니메이션 키프레임
const loadingAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

// 애니메이션 적용
const SkeletonItem = styled.span<{ width: string; height: string }>`
  display: block;
  height: ${(props) => props.height};
  background: linear-gradient(90deg, #e8e8e8, #f5f5f5, #e8e8e8);
  background-size: 200% 100%;
  animation: ${loadingAnimation} 2s infinite;
  width: ${(props) => props.width};
  border-radius: 4px;
`

const SkeletonContent = styled.div``

// 스켈레톤 UI 컴포넌트
function HeaderSkeletonUI() {
  return (
    <SkeletonContent>
      <SkeletonItem width="15rem" height="4.3rem"></SkeletonItem>
    </SkeletonContent>
  )
}

export default HeaderSkeletonUI
