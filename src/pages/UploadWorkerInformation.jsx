import React, { useState } from 'react'
import { uploadImageToComparedFacesBucket, getRandomImageName} from '../services/rekogniton/imageServices.js'
import { Container } from '../components/common/Container'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useRef, useEffect } from 'react'

function UploadWorkerInformation() {
    const [image,setImage] = useState(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() =>{
        handleCameraClick();
    },[])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        getRandomImageName().then(name =>{
            uploadImageToComparedFacesBucket(name.data,file);
        });
    }
    const handleCameraClick = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
    }
    const handleImageCapture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video,0,0);
        setImage(canvas.toDataURL("image/png"));
    }

    return (
        <Container>
            <canvas ref={canvasRef}></canvas>
            <video ref={videoRef}></video>
            <Button onClick={handleImageCapture}>Tomar foto</Button>
            <Input type='file' onChange={handleImageUpload}/>
        </Container>
    )
}
export default UploadWorkerInformation
