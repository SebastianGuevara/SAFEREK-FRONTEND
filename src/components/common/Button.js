import styled from "styled-components";

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 1.5s;
    width:${props=>props.width};
`