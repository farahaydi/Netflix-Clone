import Movie from "./Movie";
import FavList from "./FavList";
function MovieList(props) {
  let data = props.data;
  let show = props.show;
  let handleClose = props.handleClose;
  let handleShow = props.handleShow;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {data.map((obj, i) => (
        <Movie data={obj} key={i} commentHandler={props.commentHandler} />
      ))}
    </div>
  );
}

export default MovieList;
