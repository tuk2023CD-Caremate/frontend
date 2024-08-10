import { createGlobalStyle } from 'styled-components'
import PretendardBlack from './assets/fonts/Pretendard-Black.woff'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "PretendardBlack";
    src: url(${PretendardBlack}) format('woff'); 
    font-style: normal;
    font-weight: normal; 
  }

  body {
    font-family: 'PretendardBlack', sans-serif; 
  }
`
