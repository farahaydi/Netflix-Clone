import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "./Movie.css";

function FavList({ comm }) {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [favmovie, setFavMovie] = useState([]);
  const commentRef = useRef("");

  async function fetchFavMovies() {
    const url = process.env.REACT_APP_SERVER_URL;
    const response = await fetch(`${url}/getMovies`);
    const receivedData = await response.json();
    setFavMovie(receivedData);
  }

  async function handleDelete(id) {
    const url = `${process.env.REACT_APP_SERVER_URL}/delete/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      fetchFavMovies();
    } else {
      console.log("Failed to delete the movie");
    }
  }

  const handelUpdate = async (id) => {
    const data = {
      newComment: comm.comment,
    };
    const url = `${process.env.REACT_APP_SERVER_URL}/update/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("Movie Updated", data);
    } else {
      console.log("Failed");
    }
  };

  useEffect(() => {
    fetchFavMovies();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (movie) => {
    setShow(true);
    setModalData(movie);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userComment = commentRef.current.value;
    console.log(userComment);
  };

  return (
    <div>
      {favmovie.map((movie) => (
        <Card key={movie.id} style={{ width: "18rem" }} className="card">
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/original${movie.actor}`}
          />
          <Card.Body className="cbody">
            <Card.Title>
              <p className="text">{movie.title}</p>
            </Card.Title>
            <Card.Text className="text"> {movie.comment}</Card.Text>
            <Button
              onClick={() => handleDelete(movie.id)}
              className="btn"
              style={{
                backgroundColor: "red",
                border: "2px solid red",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => handleShow(movie)}
              className="btn"
              style={{
                backgroundColor: "red",
                border: "2px solid red",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Update
            </Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Update Your Comment</Form.Label>
              <Form.Control ref={commentRef} as="textarea" rows={3} />
            </Form.Group>
            <Button type="submit"  onClick={() => handelUpdate(modalData.id)}>submit</Button>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FavList;
