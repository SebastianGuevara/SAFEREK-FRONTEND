import axios from 'axios';

export const uploadImageToComparedFacesBucket = (name, file) => {
  const formData = new FormData();
  formData.append('key', 'comparedFaces');
  formData.append('name', name);
  formData.append('file', file);
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://18.215.176.229:8050/api/images/uploadComparedImage',
    headers: { 
      'Content-Type': 'multipart/form-data'
    },
    data : formData
  };
  
  return axios.request(config)
}

export const getRandomImageName = () =>{
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://18.215.176.229:8050/api/images/randomName',
    headers: { }
  };

  return axios.request(config)
}