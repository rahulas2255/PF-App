import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'


function Dashboard() {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    const user = sessionStorage.getItem("username")
   if(user){
    setUsername(user)
   }else{
    setUsername("")
   }
  },[])
  return (
    <>
    <Header insideDashboard/>
    <div style={{marginTop:'60px'}} className='dashboard container'>
      <h1 className='fw-bolder'>Welcome <span className='text-warning'>{username.split(" ")[0]}</span></h1>
      <div className="row">
        <div className="col-lg-8">
          <MyProjects/>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
      </div>

    </div>
      
    </>
  )
}

export default Dashboard