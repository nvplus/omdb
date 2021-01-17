import React, {useState} from 'react';

import MovieSearch from './MovieSearch';
import MovieSearchDisplay from './MovieSearchDisplay';
import NominationsDisplay from './NominationsDisplay';
import Banner from './Banner';

import './styles/App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { SignIn, SignOut, UserDisplay } from './FirebaseUtils';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function Navbar(props) {
  return (
    <div className="navbar">
        <h1>The Shoppies</h1>
        {props.user && <UserDisplay user={props.user} auth={auth}/>}{props.user ? <SignOut auth={auth}/> : <SignIn auth={auth}/>}
    </div>
  )
}



function App() {
  const [nominations, setNominations] = useState([]);
  const [searchResults, setSearchResults] = useState();
  const [user] = useAuthState(auth);

  let isNominated = imdbID => {
    for (const nomination of nominations) {
      if (nomination.imdbID == imdbID) return true;
    }
    return false;
  }
  
  let nominateMovie = movie => {
    if (isNominated(movie.imdbID)) return;

    if (nominations.length >= 5) {
      alert("You may only have up to 5 nominations, please remove one."); 
    }
    else {
      setNominations([...nominations, movie]);
    }
  }

  return (
    <div>
      {nominations.length == 5 && <Banner/>}
      <Navbar user={user}/>
      <div className="omdb">
        <MovieSearch searchResults={searchResults} setSearchResults={setSearchResults}/> 
        {!searchResults && <div className="prompt"><p>Search for a movie to begin!</p></div>}
        {searchResults !== [] && <div>{<MovieSearchDisplay results={searchResults} nominateMovie={nominateMovie} isNominated={isNominated} />}
        {nominations.length > 0 && <NominationsDisplay nominations={nominations} setNominations={setNominations}/>}
        </div>}
      </div>
    </div>


  )
}

export default App;
