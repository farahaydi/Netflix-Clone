import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import Head from "./Head";
import Movie from "./Movie";
function Home() {
  const [data, setData] = useState([]);

  async function getTrending() {
    const url = process.env.REACT_APP_SERVER_URL;
    const response = await fetch(`${url}/trending`);
    const movies = await response.json();
   
    setData(movies);
  }
  function commentHandler(newMovie, id) {
    data.map((movies) => {
      if (movies.id === id) {
        movies.comment = newMovie.userComment;
        return movies;
      } else {
        return movies;
      }
    });
  }
  useEffect(() => {
    getTrending();
  }, []);

  return (
    <div>
      {/* <Head /> */}
      <MovieList commentHandler={commentHandler} data={data} />
    </div>
  );
}
export default Home;
