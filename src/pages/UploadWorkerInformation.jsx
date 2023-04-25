import React from 'react'
import { uploadImageToComparedFacesBucket, getRandomImageName} from '../services/rekogniton/imageServices.js'
import { Container } from '../components/common/Container'
import { Button } from '../components/common/Button'
import { FormsInput, Input } from '../components/common/Input'
import { FormsLabel } from '../components/common/Label.js'
import { CameraCanvas } from '../components/common/Canvas'
import { Video } from '../components/common/Video.js'
import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

function UploadWorkerInformation() {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

    const nameRef = useRef(null);
    const lastNameRef = useRef(null);
    const idRef = useRef(null);
    const roleRef = useRef(null);

    const [image, setImage] = useState(null);

    useEffect(() =>{
        handleCameraClick();
    },[image])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
    }
    const handleCameraClick = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        const video = videoRef.current;
        console.log(image);
        if(image){
            video.srcObject = null;
        }
        else{
            video.srcObject = stream;
            video.play();
        }
    }
    const handleImageCapture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video,0,0);
        canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const buffer = event.target.result;
              setImage(URL.createObjectURL(new Blob([buffer], { type: 'image/jpeg' })));
            };
            reader.readAsArrayBuffer(blob);
          }, 'image/png', 1);
    }
    const uploadInformation = () => {
        if(''!=nameRef.current.value && ''!=lastNameRef.current.value  && ''!=idRef.current.value && ''!=roleRef.current.value && image){
            fetch(image)
            .then(response => response.blob())
            .then(blob => {
                uploadImageToComparedFacesBucket(idRef.current.value,blob)
            })
            alert("Información subida con éxito");
            nameRef.current.value = '';
            lastNameRef.current.value = '';
            idRef.current.value = '';
            roleRef.current.value = '';
            setImage(null);
        }
        else{
            alert("Hace algun espacio por rellenar");
        }    
    }

    return (
        <UploadWorkerInformationContainer>
            <FotoContainer width={100}>
                <CanvasContainer>
                    {image&&<img style={{zIndex:"3"}} src={image} alt={"Foto de perfil"}></img>}
                    {!image&&<CameraCanvas width={100} ref={canvasRef}/>}
                    <Video ref={videoRef}/>
                </CanvasContainer>
            </FotoContainer>
            <FormContainer>
                <InputsContianer>
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsLabel>Nombres:</FormsLabel>
                    </div>
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsInput ref={nameRef}/>
                    </div>     
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsLabel>Apellidos:</FormsLabel>
                    </div>     
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsInput ref={lastNameRef}/>
                    </div>     
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsLabel>ID:</FormsLabel>
                    </div>     
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsInput ref={idRef} type='number'/>
                    </div>     
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsLabel>Cargo:</FormsLabel>
                    </div>     
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsInput ref={roleRef}/>
                    </div>     
                    <div style={{width:"100%",heigth:"100%",position:"relative"}}>
                        <FormsLabel>Foto:</FormsLabel>
                    </div>     
                    <FotoInputConainter>
                        <Button style={{width:"90%"}} onClick={()=>handleImageCapture()}>Tomar foto</Button> 
                        <label style={{alignSelf:"center"}}>ó</label>
                        <Input style={{alignSelf:"center"}} type='file' onChange={handleImageUpload}/>                   
                    </FotoInputConainter>                  
                </InputsContianer>
            </FormContainer>
            <Button onClick={()=>uploadInformation()} style={{position:"absolute", bottom:"10%"}}>Subir Información</Button>
        </UploadWorkerInformationContainer>
    )
}
export default UploadWorkerInformation
const UploadWorkerInformationContainer = styled(Container)`
    display: flex;
    flex-direction: row;
`
const FotoContainer = styled.div`
    display: flex;
    width: ${props=>props.width}%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: 1.5s;
    gap: 5%;
`
const FormContainer = styled.div`
    display: flex;
    width: 100%;
    height:100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const InputsContianer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 80%;
    height: 50%;
    background-color:white;
`
const CanvasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 50%;
    position: relative;
`
const FotoInputConainter = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-left: 5%;  
    flex-direction: column;  
`