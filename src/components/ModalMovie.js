import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./ModalMovie.css";

function ModalMovie({
  handleShow,
  handleClose,
  show,
  modalData,
  commentHandler,
}) {
  const [comment, setComment] = useState("");
  const commentRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const userComment = commentRef.current.value;
    console.log(userComment);
    const newMovie = { ...modalData, userComment }; // copy everything in modalData and add userComment to it
    setComment(userComment);
    commentHandler(newMovie, modalData.id);
    console.log("new object contain comment", newMovie);
  }

  const handleAddFav = async () => {
    try {
      const maxOverviewLength = 199;
      const truncatedOverview = modalData.overview.slice(0, maxOverviewLength);

      const data = {
        t: modalData.title,
        a: modalData.poster_path,
        o: truncatedOverview,
        c: modalData.comment,
      };
      const url = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${url}/addMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200 || 201) {
        console.log("Movie added to fav", data);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            style={{ width: "100px" }}
            src={`https://image.tmdb.org/t/p/original${modalData.poster_path}`}
            alt={modalData.title}
          />
          <p>{modalData.overview}</p>

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ADD YOUR COMMENT</Form.Label>
              <Form.Control ref={commentRef} as="textarea" rows={3} />
            </Form.Group>
            <Button type="submit">submit</Button>
            <Button onClick={handleAddFav}>Add To Favorite</Button>
          </Form>
          {modalData.comment ? modalData.comment : "No Comment Added"}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMovie;
