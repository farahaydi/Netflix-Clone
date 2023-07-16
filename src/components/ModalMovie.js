import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import './ModalMovie.css'

function ModalMovie({ handleShow, handleClose, show, modalData }) {
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

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ADD YOUR COMMENT</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button>
            Add To Favorite
          </Button>
          <Button  onClick={handleClose}>
            Close
          </Button>
          <Button  onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMovie;
