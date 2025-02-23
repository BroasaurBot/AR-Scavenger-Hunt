import React, {useState} from 'react'
import { onAuthStateChanged, signInWithPopup} from 'firebase/auth';
import {doc , setDoc, getDoc} from 'firebase/firestore';
import {auth, db, provider} from '../firebase';
import GDSC_logo from '../components/GDSC_logo';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';


async function setupDocument(user) {
    const ref = doc(db, "players", user.uid);
    if ((await getDoc(ref)).exists()) {
        console.log("User already exists");
    }else {
        await setDoc(ref, {
            collected: [],
            count: 0,
            points: 0,
            uid: user.uid,
            name: user.displayName
        });
    }
}

function SignIn() {
    const navigate = useNavigate();
    const [signing, setSigning] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setupDocument(user);
            navigate("/")
        } else {
            setSigning("signIn");
        }
    });

    const signIn = () => {
        setSigning("loading");
        signInWithPopup(auth, provider);
    }
    const signOut = () => {
    auth.signOut();
    }

  return (
    <div className="column mobile-width">
        <BackButton home></BackButton>
        <GDSC_logo> </GDSC_logo>
        <div className="title">
            Join the Hunt!
        </div>
        <p className="text-md mb-md">
            Sign in with your Google account to start hunting!
        </p>
        {signing === "signIn" && 
            <Button size={25} back_color="#4285F4" onClick={signIn}>Sign In</Button>
        }  
        {signing === "loading" && <div className="lds-dual-ring"></div>}
    </div>
  )
}

export default SignIn