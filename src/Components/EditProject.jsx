import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState,useContext } from "react";
import { SERVER_URL } from "../Services/serverUrl";
import { ToastContainer, toast } from "react-toastify";
import { editProjectAPI } from "../Services/allAPIs";
import { editProjectResponseContext } from "../Context API/ContextShare";


function EditProject({ project }) {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

  console.log(project);
  const [projectData, setProjectData] = useState({
    id: project._id,
    title: project.title,
    languages: project.languages,
    overview: project.overview,
    github: project.github,
    website: project.website,
    projectImage: "",
  });
  const [preview, setPreview] = useState("");
   

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setPreview("");
    }
  }, [projectData.projectImage]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      id: project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImage: "",
    });
    setPreview("");
  };

  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    const { id, title, languages, overview, github, website, projectImage } =
      projectData;

    if (!title || !languages || !overview || !github || !website) {
      toast.info("Please fill The form completely !!!");
    } else {
      // api call - reqBody
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", project.projectImage);

      // api call - reqHeader
      const token = sessionStorage.getItem("token");
      console.log(token);
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${token}`,
        };
        // api call
        try {
          const result = await editProjectAPI(id, reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            handleClose();
            setEditProjectResponse(result.data)
            
          } else {
            toast.warning(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  return (
    <>
      <button onClick={handleShow} className="btn ">
        <i className="fa-solid fa-edit fa-2x"></i>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImage: e.target.files[0],
                    })
                  }
                />
                <img
                  style={{ height: "300px", width: "300px" }}
                  className="w-100"
                  src={
                    preview
                      ? preview
                      : `${SERVER_URL}/uploads/${project.projectImage}`
                  }
                  alt="Upload Product Image"
                />
              </label>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Title"
                  value={projectData.title}
                  onChange={(e) =>
                    setProjectData({ ...projectData, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Language Used"
                  value={projectData.languages}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      languages: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Github Link"
                  value={projectData.github}
                  onChange={(e) =>
                    setProjectData({ ...projectData, github: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Website Link"
                  value={projectData.website}
                  onChange={(e) =>
                    setProjectData({ ...projectData, website: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Overview"
                  value={projectData.overview}
                  onChange={(e) =>
                    setProjectData({ ...projectData, overview: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="btn-success"
            variant="danger"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default EditProject;
