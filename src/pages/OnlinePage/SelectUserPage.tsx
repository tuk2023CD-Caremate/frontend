import React, { useState, ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import Header2 from '../../components/Header2'
import Navbar2 from '../../components/Navbar2'
import SelectUserModal from '../../components/SelectUserModal'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

function SelectUser() {
  const location = useLocation()
  const IdInfo = location.state

  return (
    <div>
      <Header2 />
      <Navbar2 />
      <Container>
        <SelectUserModal id={IdInfo} />
        {/* <ConfirmMatchingModal /> */}
        {/* <FindLoadingModal /> */}
        {/* <MatchingLoadingModal /> */}
      </Container>
    </div>
  )
}

export default SelectUser
