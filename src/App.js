import React, {useState} from 'react';
import MovieSearch from './MovieSearch'
import MovieSearchDisplay from './MovieSearchDisplay'
import './styles/App.css';

function App() {
  const [nominations, setNominations] = useState([]);
  let [searchResults, setSearchResults] = useState();

  let nominateMovie = movie => {
    if (nominations.length >= 5) {
      alert("You may only have up to 5 nominations, please remove one."); 
    }
    else {
      console.log(movie);
      setNominations([...nominations, movie]);
    }
      
  }
  
  return (
    <div>
      <h1>OMDb Nomination App</h1>
      <MovieSearch searchResults={searchResults} setSearchResults={setSearchResults}/>
      {searchResults !== [] && <div>{<MovieSearchDisplay results={searchResults} nominateMovie={nominateMovie}/>}</div>}
      <h3>Your nominations:</h3>
      <ul>{nominations.map(nom => <li key={nom.imdbID}>{nom.Title} ({nom.Year})</li>)}</ul>
    </div>
  )
}

export default App;
