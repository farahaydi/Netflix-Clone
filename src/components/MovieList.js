import Movie from "./Movie";
function MovieList (props)
{
    let data =props.data;
    return(
    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around'}}>

    {data.map((obj, i) => (
        <Movie data={obj} key={i}/>
    ))}
        </div>
    )
}

export default MovieList;