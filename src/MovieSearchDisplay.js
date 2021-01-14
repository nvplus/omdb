import React from 'react';

function MovieSearchDisplay (props) {
    if (props.results == null) return false;

    let results = props.results;

    if (results.Response === "False") {
        return <div>Error: {props.results.Error}</div>
    }

    else {
        let resultLi = props.results.Search.map(res => {
            return (
                    <li key={res.imdbID}>
                        {res.Title} ({res.Year} ) 
                            <button onClick={() => props.nominateMovie(res)}>Nominate</button>
                    </li>
            )
        });

        return <ul>{resultLi}</ul>
    }
    
}

export default MovieSearchDisplay;