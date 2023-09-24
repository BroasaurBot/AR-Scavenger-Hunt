import React from 'react'
import { onAuthStateChanged, signInWithRedirect} from 'firebase/auth';
import {doc , setDoc, getDoc} from 'firebase/firestore';
import {auth, db, provider} from '../firebase';
import GDSC_logo from '../components/GDSC_logo';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

const signIn = () => {
signInWithRedirect(auth, provider);
}
const signOut = () => {
auth.signOut();
}

async function setupDocument(user) {
    const ref = doc(db, "players", user.uid);
    if ((await getDoc(ref)).exists()) {
        console.log("User already exists");
    }else {
        await setDoc(ref, {
            collected: [],
            count: 0,
            points: 0,
            uid: user.uid
        });
    }
}

function SignIn() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.history.back();
        }
    });

  return (
    <div class="column mobile-width">
        <BackButton home></BackButton>
        <GDSC_logo> </GDSC_logo>
        <div class="title">
            Join the Hunt!
        </div>
        <p class="text-md mb-md">
            Sign in with your Google account to start hunting!
        </p>
        <Button size={25} back_color="#4285F4" onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default SignIn