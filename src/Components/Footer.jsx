import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div style={{marginTop:'50px',backgroundColor:'#90ee90'}} className='w-100  '>
     <div className="footer-content d-flex justify-content-between container align-items-center">
      <div className="title w-25 mt-5">
        <h3 style={{height:'40px'}}><i class="fa-solid fa-file-powerpoint fa-bounce"></i>  Project Fair</h3>
        <span style={{color:'white'}}>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</span> <br /> <br />
        <span style={{color:'white'}}>Code licensed MIT,docs CC BY 3.0.</span> <br />
        <span style={{color:'white'}}>Currently v5.3.2.</span>
      </div>
      <div className="links d-flex flex-column">
        <h3 style={{height:'40px'}}>Links</h3>
        <Link to={'/'} style={{textDecoration:'none',color:'white'}}><a style={{color:'white'}} className='text-decoration-none ' href="">Home</a>
        </Link>
        <Link to={'/cart'} style={{textDecoration:'none',color:'white'}}><a style={{color:'white'}} className='text-decoration-none ' href="">Login</a>
        </Link>

        <Link to={'/wishlist'} style={{textDecoration:'none',color:'white'}}><a style={{color:'white'}} className='text-decoration-none ' href="">Register</a>
        </Link>
      </div>
      <div className="guides d-flex flex-column">
      <h3 style={{height:'40px'}}>Guides</h3>
        <a style={{color:'white'}} className='text-decoration-none ' href="">React</a>
        <a style={{color:'white'}} className='text-decoration-none ' href="">React Bootstrap</a>
        <a style={{color:'white'}} className='text-decoration-none ' href="">React Routing</a>
      </div>
      <div className="contact">
        <h3 style={{height:'40px'}}>Contact Us</h3>
        <div className='d-flex'>
          <input placeholder='Enter your mail' type="text" className='form-control' />
          <button className='btn btn-info ms-2'> <i class="fa-solid fa-arrow-right"></i> </button>

        </div>
        <div style={{color:'white'}} className='icons mt-3 d-flex justify-content-between'>
          <i style={{height:'50px'}} class='fa-solid fa-envelope fa-2x'></i>
          <i style={{height:'50px'}} class='fa-brands fa-twitter fa-2x'></i>
          <i style={{height:'50px'}} class='fa-brands fa-github fa-2x'></i>
          <i style={{height:'50px'}} class='fa-brands fa-facebook fa-2x'></i>
          <i style={{height:'50px'}} class='fa-brands fa-instagram fa-2x'></i>
          <i style={{height:'50px'}} class='fa-brands fa-linkedin fa-2x'></i>

        </div>

      </div>
     </div>
     <p className='text-center mt-4'>Copyright &copy; 2023 Project Fair. Built with React</p>

    </div>
  )
}

export default Footer