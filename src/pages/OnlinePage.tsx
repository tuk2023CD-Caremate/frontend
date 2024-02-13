import React from 'react'
import styled from 'styled-components'
import Header2 from '../components/Header2'
import Navbar2 from '../components/Navbar2'
import SelectUserModal from '../components/SelectUserModal'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  align-items: center;
  justify-content: center;
`

function OnlinePage() {
  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <SelectUserModal />
      </Container>
    </div>
  )
}

export default OnlinePage
