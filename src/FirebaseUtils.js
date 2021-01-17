import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export function SignIn(props) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);

  }
  return (
    <button onClick={signInWithGoogle}>Sign in</button>
  )
}

export function SignOut(props) {
  return props.auth.currentUser && (
    <button onClick={() => props.auth.signOut()}>Sign out</button>
  )
}

export function UserDisplay(props) {
  return <div>
    <p><img src={props.user.photoURL} height="14px"/>       {props.user.displayName}</p>
  </div>
}

