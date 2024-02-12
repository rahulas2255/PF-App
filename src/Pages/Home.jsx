import React, { useEffect, useState } from 'react'
import mern from '../assets/Images/mern.png'
import { Link,useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../Services/allAPIs';

function Home() {
  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [allProjects,setAllProjects] = useState([])
  console.log(allProjects);

  const getHomeProject = async ()=>{
    const result = await getHomeProjectAPI()
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  const handleProjectPage = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
    toast.warning("Please Login to Explore our Projects")
    }
  }
  return (
    
    <>
      {/* landing part */}
      <div style={{width:'100%',height:'100vh',backgroundColor:'#90ee90'}} className='rounded '>
        <div style={{height:'100%'}} className='container'>
        <div  style={{height:'100%'}} className='row align-items-center'>
          <div className='col-lg-5'>
            <h1 style={{fontSize:'80px'}} className='fw-bolder text-light'> <i class="fa-solid fa-file-powerpoint fa-bounce text-light"></i> Project Fair</h1>
            <p>With digital presence becoming a necessity for brands to expand and gain exposure among potential customers, the web development industry is taking off rapidly, and so is the demand for Web Developers. In fact, web development has emerged as a promising field right now, attracting aspirants from all educational and professional backgrounds. As industries continue facing fierce competition among fellow brands and services, the ones keeping up with trends steal the limelight. The severe expansion of digitally engaged audiences has proved that web development is no more a choice but a necessity to reach a broader customer base, increase engagement and promote services</p>
            {isLoggedIn?<Link className='btn btn-warning' to={'/dashboard'}>Manage Your Projects <i className='fa-solid fa-arrow-right ms-2'></i> </Link>:<Link className='btn btn-warning' to={'/login'}>Starts to Explore <i className='fa-solid fa-arrow-right ms-2'></i> </Link>}
          </div>
          <div className='col-lg-2'></div>
          <div className='col-lg-4'>
            <img style={{width:'690px'}}  src={mern} alt="No Image" />
          </div>
          <div className='col-lg-1'/>
          
        </div>
        </div>
      </div>
      {/* all projects */}
      <div className='projects mt-5'>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee >
          <div className='d-flex justify-content-between'>
            {allProjects.length>0? allProjects.map((project,index)=>(

            <div key={index} className="me-5">
              <ProjectCard project={project}/>
            </div>
            )):null }

          </div>
        </marquee>
        <div className="text-center">
          <button onClick={handleProjectPage} className='btn btn-link'>View More Projects</button>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme='colored' />

    </>
  )
}

export default Home