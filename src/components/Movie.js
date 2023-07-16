import React, {useState} from "react";
import "./Movie.css";
import ModalMovie from "./ModalMovie";
import { Card, Button } from "react-bootstrap";
//import ModalCard from "./ModalCard";
function Movie(props) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card style={{ width: '18rem' }} className="card">
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${props.data.poster_path}`} />
        <Card.Body className="cbody">
          <Card.Title ><p className="text">{props.data.title}</p></Card.Title>
          <Card.Text className="text"> {props.data.release_date}</Card.Text>
          {/* <Button variant="primary">ADD TO FAV</Button> */}
          <Button onClick={handleShow} className="btn" style={{ backgroundColor: 'red', border: '2px solid red', textTransform: 'uppercase', fontWeight: 'bold' }}>Show Modal</Button>  
        </Card.Body>
      </Card>
      <ModalMovie  modalData={props.data} handleClose={handleClose} handleShow={handleShow} show={show} />
    </div>
  );
}

export default Movie;
