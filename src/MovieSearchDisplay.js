import React, { useState } from 'react';
import './styles/App.css';

function MovieSearchDisplay (props) {
    const [display, setDisplay] = useState(true);
    let toggleDisplay = () => setDisplay(!display);
    if (props.results == null) return false;

    let results = props.results;

    if (results.Response === "False") {
        return <div>Error: {props.results.Error}</div>
    }

    else {
        let resultLi = props.results.Search.map(res => {
            return (
                    <li className="movie-list-item" key={res.imdbID}>
                        <img src={res.Poster != "N/A" ? res.Poster : "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png"} alt="Poster"/>
                        <p>{res.Title} ({res.Year})</p>
                        <button onClick={() => props.nominateMovie(res)}>Nominate</button>
                    </li>
            )
        });

        return (
            <div className="movie-search-display">
                <h3>Search results:</h3>
                {display && <ul className="movie-list">{resultLi}</ul>}
                <button className="showHide" onClick={toggleDisplay}>{display ? "Hide search results" : "Show search results"}</button>
            </div>
        ) 
    }
    
}

export default MovieSearchDisplay;