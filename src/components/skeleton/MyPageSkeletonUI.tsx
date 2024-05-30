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

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 31rem;
  height: 40rem;
`
const SkeletonUpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.25rem;
`

const SkeletonProfile = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3rem;
  margin-bottom: 1.5rem;
`

const SkeletonName = styled.div`
  margin-bottom: 1.25rem;
`

const SkeletonLower = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SkeletonTitle = styled.div`
  margin-top: 1.25rem;
`

// 스켈레톤 UI 컴포넌트
function MyPageSkeletonUI() {
  return (
    <SkeletonWrapper>
      <SkeletonUpper>
        <SkeletonProfile>
          <SkeletonItem width="8rem" height="8rem"></SkeletonItem>
        </SkeletonProfile>
        <SkeletonName>
          <SkeletonItem width="18.75rem" height="5rem"></SkeletonItem>
        </SkeletonName>
      </SkeletonUpper>
      <SkeletonLower>
        <SkeletonTitle>
          <SkeletonItem width="28rem" height="3rem"></SkeletonItem>
        </SkeletonTitle>
        <SkeletonTitle>
          <SkeletonItem width="28rem" height="3rem"></SkeletonItem>
        </SkeletonTitle>
        <SkeletonTitle>
          <SkeletonItem width="28rem" height="3rem"></SkeletonItem>
        </SkeletonTitle>
        <SkeletonTitle>
          <SkeletonItem width="28rem" height="3rem"></SkeletonItem>
        </SkeletonTitle>
      </SkeletonLower>
    </SkeletonWrapper>
  )
}

export default MyPageSkeletonUI
