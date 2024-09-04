import './App.css'
// import {Switch , Route} from 'react-router-dom'
import Login from './components/Login'
import { useEffect } from 'react';
import Register from './components/Register'
import Photo from './components/Photo';
import { Routes, Route ,Navigate } from 'react-router-dom';
import NewPhoto from './components/NewPhoto';
import { useDispatch , useSelector } from 'react-redux'
function App() {
  const id = useSelector((state)=>state.info.id)
  useEffect(()=>{console.log(id)},[id])

  return (
    <>
      <Routes>
      <Route exact path="/" element={id ? <NewPhoto /> : <Navigate to="/login" />} />
        <Route path="/login" element={<div><Login /></div>} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/newUpload" element={<NewPhoto/>}/>
      </Routes>
    </>
  )
}

export default App
