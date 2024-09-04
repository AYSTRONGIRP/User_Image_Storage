import React from 'react'
import { createRef} from 'react'
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux'
import { setEmail , setPassword , setId } from '../slices/login_info'
import { useEffect ,useState } from 'react';

const Photo = ({ key }) => {
    const fileUpload = createRef();
    const id = useSelector((state)=>state.info.id)
    const email = useSelector((state)=>state.info.email)
    const password = useSelector((state)=>state.info.password)
    const name = useSelector((state)=>state.info.name)
    const dispatch = useDispatch();
    const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/showPhotoes?id=${id}`)
      .then(response => {
        console.log(response)
        setImageUrls(response.data.images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, [key]);

  return (
    <div>
        <style>
        {`
          .image_container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }

          .image_container img {
            width: 400px; /* Adjust the width as needed */
            height: 300px; /* Adjust the height as needed */
            margin: 10px;
          }

          h2{
            
          }
        `}
        </style>
      <h2>Image Gallery</h2>
      <div className='image_container'>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={`http://localhost:8080${imageUrl}`} alt={`Image ${index}`} />
      ))}
      </div>
    </div>
  );
};

export default Photo;