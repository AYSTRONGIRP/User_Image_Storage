import React from 'react'
import { createRef} from 'react'
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux'
import { setEmail , setPassword , setId , clear} from '../slices/login_info'
import { useState , useEffect} from 'react';
import Photo from './Photo';
import { useNavigate } from 'react-router-dom';
const NewPhoto = () => {
    const fileUpload = createRef();
    const id = useSelector((state)=>state.info.id)
    const email = useSelector((state)=>state.info.email)
    const password = useSelector((state)=>state.info.password)
    const name = useSelector((state)=>state.info.name)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [refreshKey, setRefreshKey] = useState(0);

    // useEffect(() =>{
    //   if (!email) 
    //   {
    //   navigate('/login');
    //   }},[email])

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", fileUpload.current.files[0]);
        formData.append("id", id);
        try {
          const response = await axios.post('http://localhost:8080/newUpload', formData);
          console.log(response);
          setRefreshKey((prevKey) => prevKey + 1);
          console.log('Refresh Key:', refreshKey);
        } catch (error) {
          console.error('Error during the request:', error);
        }
        
    }

    

  return (
    <div>
      <style>
        {`
          .upload {
            height: 400px;
            
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
          }

          .name{
            position: fixed;
            right: 100px;
          }
        `}
      </style>
    
      <div className='name'>{id}</div>
      <button onClick={()=>{dispatch(clear());navigate('/login');}}>Log Out</button>
      <div className='upload'>
      
      <form onSubmit={onSubmit}>
      <input type="file" name="photo" ref={fileUpload} />
      <input type='submit' value="Submit" />
      </form>
      </div>
      <Photo key={refreshKey} />
    
    </div>
    
  )
}

export default NewPhoto
