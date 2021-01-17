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
  authDomain: "omdb-aad7c.firebaseapp.com",
  projectId: "omdb-aad7c",
  storageBucket: "omdb-aad7c.appspot.com",
  messagingSenderId: "826421328702",
  appId: "1:826421328702:web:a1c06ffa9708d726688a6f",
  measurementId: "G-HNB7GLRMPP"
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
