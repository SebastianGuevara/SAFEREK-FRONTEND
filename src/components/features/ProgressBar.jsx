import React from 'react'
import styled from 'styled-components';

function ProgressBar(props) {
    const value = props.value;
  return (
    <ProgressBarContainer>
        <h3>{value}%</h3>
        <Progress value={value}/>
    </ProgressBarContainer>
  )
}

export default ProgressBar
const ProgressBarContainer = styled.div`
    background-color: #ecfbff;
    height: 5%;
    width: 50%;
    margin: 3%;
    border-radius: 30px;
    overflow: hidden;
    border: 1px solid black;
    position: relative;
    text-align: center;
    text-justify: center;
    padding: 5px;
    h3{
        position: absolute;
        top: 20%;
        right: 0;
        left: 0;
        margin: 0;
    }
`
const Progress = styled.div`
    height:100%;
    width:${props => props.value}%;
    background: linear-gradient(180deg, hsla(214, 100%, 71%, 1) 0%, hsla(221, 79%, 50%, 1) 100%);
    border-radius: 30px;
`