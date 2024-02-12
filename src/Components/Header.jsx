import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { tokenAuthenticationContext } from '../Context API/TokenAuth'
function Header({insideDashboard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <>
    <Navbar style={{backgroundColor:'#90ee90'}}>
    <Container>
      <Navbar.Brand>
        <Link to={'/'} style={{textDecoration:'none',color:'white',fontWeight:'bold'}}>
        <i class="fa-solid fa-file-powerpoint fa-bounce"></i>  Project Fair
        </Link>
        </Navbar.Brand>
        {
          insideDashboard &&
          <div className='ms-auto'>
            <button onClick={handleLogout} className='btn text-dark'><i className='fa-solid fa-gear'></i> Logout</button>
          </div>
        }
    </Container>
  </Navbar>
    </>
  )
}

export default Header