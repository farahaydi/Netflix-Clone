import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "./FavList.css";

function FavList() {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [favmovie, setFavMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const commentRef = useRef();

  async function fetchFavMovies() {
    try {
      const url = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${url}/getMovies`);
      const receivedData = await response.json();
      setFavMovie(receivedData);
      setLoading(false);
    } catch (error) {
     
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFavMovies();
  }, []);

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

  async function handleUpdate(id) {
    const userComment = commentRef.current.value;
    const maxOverviewLength = 199;
    const data = {
      t: modalData.title,
      a: modalData.poster_path,
      o: modalData.overview.slice(0, maxOverviewLength),
      comment: userComment,
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
      fetchFavMovies();
      handleClose();
    } else {
      console.log("Failed");
    }
  }

  const handleClose = () => {
    setModalData({});
    setShow(false);
  };

  const handleShow = (movie) => {
    if (movie) {
      setShow(true);
      setModalData(movie);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(modalData.id);
  };
  if (loading) {
    return <div className="loading-container">
    <b>LOADING...</b>
    </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="movie-container">
      {favmovie.map((movie) => (
        <Card key={movie.id} className="movie-card">
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/original${movie.actor}`}
            className="movie-image"
          />
          <Card.Body className="cbody">
            <Card.Title>
              <p className="movie-title">{movie.title}</p>
            </Card.Title>
            <Card.Text className="movie-comment">{movie.comment}</Card.Text>
            <div className="movie-buttons">
              <Button
                onClick={() => handleDelete(movie.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => handleShow(movie)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Update
              </Button>
            </div>
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
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FavList;
