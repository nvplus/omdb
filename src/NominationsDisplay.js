import React from 'react';
import './styles/App.css';

function NominationItem(props) {
    let removeNomination = () => {
        console.log(props.nomination.Poster);
        let filtered = props.nominations.filter(nomination => nomination.imdbID !== props.nomination.imdbID);

        props.setNominations(filtered);
    };

    return (
        <li className="movie-list-item" key={props.imdbID}>
            <img src={props.nomination.Poster != "N/A" ? props.nomination.Poster : "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png"} alt="Poster"/>
            <p>{props.nomination.Title}</p>
            <button onClick={removeNomination}>Remove</button>
        </li>
    )
}

function NominationsDisplay(props) {
    return (
        <div className="nominations">
            <h3>Your nominations:</h3>
            <br/>
            <ul className="movie-list">
                {props.nominations.map(nomination => <NominationItem key={nomination.imdbID} nomination={nomination} nominations={props.nominations} setNominations={props.setNominations}/>)}
            </ul>
        </div> 
    )
}

export default NominationsDisplay;