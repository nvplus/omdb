import React, { useState } from 'react';

function NominationItem(props) {
    let removeNomination = () => {
        let filtered = props.nominations.filter(nomination => nomination.imdbID !== props.nomination.imdbID);

        props.setNominations(filtered);
    };

    return (
        <li className="nomination-item" key={props.imdbID}>
            {props.nomination.Title}
            <button onClick={removeNomination}>Remove</button>
        </li>
    )
}

function NominationsDisplay(props) {
    return (
        <div className="nominations">
            <h3>Your nominations:</h3>
            
            <ul>
                {props.nominations.map(nomination => <NominationItem key={nomination.imdbID} nomination={nomination} nominations={props.nominations} setNominations={props.setNominations}/>)}
            </ul>
        </div> 
    )
}

export default NominationsDisplay;