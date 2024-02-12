import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap'
import profile from '../assets/Images/upload.png'
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../Services/allAPIs';


function Profile() {
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    userName:"",password:"",email:"",github:"",linkedin:"",profileImage:""
  })
  const [existingImage,setExistingImage] = useState("")
  const [preview,setPreview] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("userDetails")){
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedin:userDetails.linkedin})
      setExistingImage(userDetails.profile)
    }
  },[open])
  console.log(userData);
  
  useEffect(()=>{
    if(userData.profileImage){
      setPreview(URL.createObjectURL(userData.profileImage))
    }else{
      setPreview("")
    }
  },[userData.profileImage])
  const handleProfileUpdate = async ()=>{
    const {username,password,email,github,linkedin,profileImage} = userData
    console.log(username,"username");
    if(!github || !linkedin){
      toast.info("Please fill the form completely")
    }else{
      // proceed to apu call
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("password",password)
      reqBody.append("email",email)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage) : reqBody.append("profileImage",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // api call
        try{
          const result = await updateUserProfileAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("userDetails",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  }
  
  return (
    <>
    <div className="d-flex rounded p-2 justify-content-between">
      <h2>Profile</h2>
      <button onClick={() => setOpen(!open)} className='btn btn-outline-warning'><i className='fa-solid fa-chevron-down'></i></button>
      
    </div>
    <Collapse in={open}>
        <div className='row shadow p-5 justify-content-center mt-3' id="example-collapse-text">
          <label className='text-center'>
          <input style={{display:'none'}} type="file" onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})}/>
            {existingImage=="" ?
              <img width={'200px'} height={'200px'} src={preview?preview:profile} alt="uploaded image" />
              :
              <img width={'200px'} height={'200px'} src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`} alt="uploaded image" />
            }
            
          </label>
          <div className="mt-3"><input placeholder='Enter your Github URL' type="text" className='form-control' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})} /></div>
          <div className="mt-3"><input placeholder='Enter your LinkedIn URL' type="text" className='form-control mt-3' value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})} /></div>
          <div className="mt-3"><button onClick={handleProfileUpdate} style={{width:'100%'}} className='btn bg-warning text-light'>Update</button></div>
        
          
        </div>

    </Collapse>
    <ToastContainer autoClose={2000} theme='colored' />

    </>
  )
}

export default Profile