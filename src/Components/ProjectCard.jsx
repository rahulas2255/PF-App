import React,{useState} from 'react'
import { Card,Modal,Row,Col } from 'react-bootstrap'
import { SERVER_URL } from '../Services/serverUrl';


function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{width:'25rem'}} className='shadow btn mb-5' onClick={handleShow}>
      <Card.Img style={{width:'23rem'}} variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
        
      </Card.Body>
    </Card>
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img className='img-fluid' style={{height:'200px'}} src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
            </Col>
            <Col md={6}>
              <h2 className='fw-bolder text-dark'>{project?.title}</h2>
              <p>Project Overview: <span className='fw-bolder' style={{textAlign:'justify'}}> {project?.overview} </span> </p>
              <p>Language Used: <span className='fw-bolder' style={{textAlign:'justify'}}> {project?.languages}</span></p>
            </Col>
          </Row>
          <div className='mt-3'>
            <a href={project?.github} target='_blank' className='btn me-3' > <i className="fa-brands fa-github fa-2x"></i> </a>
            <a href={project?.website} target='_blank' className='btn me-3' > <i className="fa-solid fa-link fa-2x"></i> </a>
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ProjectCard