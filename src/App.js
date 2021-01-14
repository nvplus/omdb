import React, {useState} from 'react';

import MovieSearch from './MovieSearch';
import MovieSearchDisplay from './MovieSearchDisplay';

import './styles/App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);

  }
  return (
    <button onClick={signInWithGoogle}>Sign in</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

function UserDisplay(props) {
  return <div>
    <img src={props.user.photoURL} width="50px"/>
    <p>Hello, {props.user.displayName}</p>
  </div>
}

function App() {
  const [nominations, setNominations] = useState([]);
  const [searchResults, setSearchResults] = useState();
  const [user] = useAuthState(auth);

  let nominateMovie = movie => {
    if (nominations.length >= 5) {
      alert("You may only have up to 5 nominations, please remove one."); 
    }
    else {
      console.log(movie);
      setNominations([...nominations, movie]);
    }
  }
  
  console.log(JSON.stringify(user));

  return (
    <div>
      {user && <UserDisplay user={user}/>}
      {user ? <SignOut/> : <SignIn/>}
      
      <h1>OMDb Nomination App</h1>
      <MovieSearch searchResults={searchResults} setSearchResults={setSearchResults}/>
      {searchResults !== [] && <div>{<MovieSearchDisplay results={searchResults} nominateMovie={nominateMovie}/>}</div>}
      <h3>Your nominations:</h3>
      <ul>{nominations.map(nom => <li key={nom.imdbID}>{nom.Title} ({nom.Year})</li>)}</ul>
    </div>
  )
}

export default App;
