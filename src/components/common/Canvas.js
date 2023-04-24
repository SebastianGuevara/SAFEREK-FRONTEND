import styled from "styled-components";
export const CameraCanvas = styled.canvas`
    position: absolute;
    z-index:2;
    transition:1.5s;
    width:${props=>props.width}%
`