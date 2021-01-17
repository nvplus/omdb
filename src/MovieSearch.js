import React, {  useState, useEffect } from 'react';
import axios from 'axios';

function MovieSearch (props) {
    let [searchTerm, setSearchTerm] = useState('');
    let [searchInput, setSearchInput] = useState('');

    useEffect (() => {
        if (searchTerm !== '') {
            axios(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}`).then(res => {
                props.setSearchResults(res.data); 
            });
        }
    }, [props, searchTerm]);

    const onSearchInput = e => setSearchInput(e.target.value);

    function onSearch(e) {
        e.preventDefault();
        if (searchInput === '') return;
        setSearchTerm(searchInput);
        setSearchInput('');
    }

    return (
        <div className="movie-search">
            <p>Search for a movie:</p>
            <form>
                <input type='text' value={searchInput} onChange={onSearchInput}/>
                <button type='submit' onClick={onSearch}>Search</button>
            </form>
        </div>
    )
}

export default MovieSearch;