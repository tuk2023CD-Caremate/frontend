import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './global.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <GlobalStyle />
    <App />
  </ChakraProvider>,
)
