import React from 'react'
import styled from 'styled-components'
import { Container } from '../components/common/Container'
import ProgressBar from '../components/features/ProgressBar'

function MainPage() {
  return (
    <MainPageContainer>
        <h1>¡BIENVENIDO A SAFEREK!</h1>
        <h2>Estamos trabajando en la página en este momento.</h2>
        <ProgressBar value={5}/>
    </MainPageContainer>
  )
}

export default MainPage
const MainPageContainer = styled(Container)`
    background: radial-gradient(circle, hsla(221, 100%, 88%, 1) 0%, hsla(215, 100%, 96%, 1) 44%);
`