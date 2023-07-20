import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  async function getTrending() {
    try {
      const url = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${url}/trending`);
      const movies = await response.json();
      setData(movies);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function commentHandler(newMovie, id) {
    try {const updatedData = data.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          comment: newMovie.userComment,
        };
      } else {
        return movie;
      }
    });
    setData(updatedData);
  } catch (error) {
      console.error("Error updating movie comment:", error);
    }

    
  }

  useEffect(() => {
    getTrending();
  }, []);


  if (loading) {
    return <div className="loading-container">
    <b>LOADING...</b>
    </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
<<<<<<< HEAD
=======
      <Head />
>>>>>>> parent of eccecb9 (test)
      <MovieList commentHandler={commentHandler} data={data} />
    </div>
  );
}

export default Home;