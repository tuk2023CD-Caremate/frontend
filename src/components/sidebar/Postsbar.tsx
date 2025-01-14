import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25rem;
  height: 31rem;
  display: flex;
  flex-direction: column;
`

const NavLink = styled(Link)<{ isActive: boolean }>`
  width: 15rem;
  font-size: 1.6rem;
  display: flex;
  margin-top: 3rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.25rem 0 1.25rem 2.5rem;
  border-radius: 1.25rem;
  background-color: ${({ isActive }) => (isActive ? '#E8DCF2' : 'inherit')};
  color: ${({ isActive }) => (isActive ? '#650FA9' : 'inherit')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'inherit')};
`

export default function PostBar() {
  const location = useLocation()

  return (
    <Container>
      <NavLink
        to="/posts"
        isActive={
          location.pathname.includes('/posts') &&
          !location.pathname.includes('/posts/questions') &&
          !location.pathname.includes('/posts/study')
        }>
        자유 게시판
      </NavLink>
      <NavLink to="/posts/questions" isActive={location.pathname.includes('questions')}>
        질문 게시판
      </NavLink>
      <NavLink to="/posts/study" isActive={location.pathname.includes('study')}>
        스터디 게시판
      </NavLink>
    </Container>
  )
}
