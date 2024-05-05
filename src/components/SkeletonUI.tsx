import styled, {keyframes} from "styled-components";

const loadingAnimation = keyframes`
 0% {
			transform: translateX(0%);
		}
    50%,
		100% {
			transform: translate(100%);
		}
`

const SkeletonWrapper = styled.div`
display: flex;
flex-direction: column;
width: calc(100% - 100px);
height: 200px;
border: 1px solid #d8d8d8;
padding: 20px 0px 0px 20px;
`

const SkeletonItem = styled.div<{width : string}>`
width: 50%;
height: 100%;
background: linear-gradient(to right, #e8e8e8 0%, #ffffff 50%, #e8e8e8 100%);
animation: ${loadingAnimation} 2s infinite;
`

const SkeletonTitle = styled.div`
width: 180px;
height: 50px;
background-color: #e8e8e8;
background-size: 200% 100%;

`
const SkeletonContent = styled.div`
width: 300px;
height: 35px;
margin-top: 20px;
background-color: #e8e8e8;
background-size: 200% 100%;
`
const SkeletonFooter = styled.div`
width: 400px;
height: 35px;
margin-top: 20px;
background-color: #e8e8e8;
background-size: 200% 100%;
`



function SkeletonUI () {
    return (
        <SkeletonWrapper>
          <SkeletonTitle>
            <SkeletonItem width="180px"/>
          </SkeletonTitle>
          <SkeletonContent>
             <SkeletonItem width="300px"/>
          </SkeletonContent>
            <SkeletonFooter>
             <SkeletonItem width="400px"/>
           </SkeletonFooter>
        </SkeletonWrapper>
    )
}

export default SkeletonUI