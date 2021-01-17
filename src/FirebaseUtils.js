import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// UI Stuff
export const SignIn = (props) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in</button>
  )
}

export const SignOut = (props) => {
  return props.auth.currentUser && (
    <button onClick={() => props.auth.signOut()}>Sign out</button>
  )
}

export const UserDisplay = (props) => {
  return <div>
    <p><img src={props.user.photoURL} height="20px" alt="avatar"/>       {props.user.displayName}</p>
  </div>
}

export const createNominationsList = (email, db) => {
  return db.collection('nominations')
      .add({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          users: [{ name: email}]
      });
};