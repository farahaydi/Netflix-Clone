import React,{useEffect, useState} from 'react';
import MovieList from './MovieList';
import "./Home.css";
function Home() {
    
    const [data, setData] = useState([]);
    
    async function getTrending() {
        const url = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(`${url}/trending`);
        const movies = await response.json();
        //console.log(movies);
        setData(movies);
    }
    useEffect(() => {
        getTrending();
    }, [])

    return(
    <div>
    <MovieList data={data} />
    </div>
    )
}
export default Home;