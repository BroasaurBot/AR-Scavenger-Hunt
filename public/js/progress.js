import { onAuthStateChanged, signInWithRedirect, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {auth, app, db, provider} from './firebase.js';
import { updateDoc, arrayUnion, getDoc, doc, onSnapshot, setDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { activeMarker, callHasCollected } from './markerEvents.js';

let collectedMarkers = [];
onAuthStateChanged(auth, (user) => {
    const signin = document.getElementById('signin');
    const collect = document.getElementById('collect');

    if (user) {
        console.log("Logged in " + user.displayName);
        collect.classList.remove("hide");
        signin.classList.add("hide");

        setupDocument(user);

        const onCollect = onSnapshot(doc(db, "users", user.uid), (doc) => {
            let data = doc.data();
            if (data != undefined) {
                collectedMarkers = data.Collected;
                console.log("Collected: ", collectedMarkers);
                callHasCollected();
            }
        });

    } else {
        console.log("User not logged in");
        signin.classList.remove("hide");
        collect.classList.add("hide");
    }
})

//Adds a document to the database if the user doesn't already have one
async function setupDocument(user) {
    const ref = doc(db, "users", user.uid);
    if ((await getDoc(ref)).exists()) {
        console.log("User already exists");
    }else {
        await setDoc(ref, {
            Collected: []
        });
    }
}

//Checks if the users has already collected the marker with id
async function alreadyCollected(id, user) {
    const querySnapshot = await getDoc(doc(db, "users", user.uid));
    if (querySnapshot.exists()) {
        return querySnapshot.data().Collected.includes("Marker"+String(id));
    }else return false;
}

const signIn = () => {
    signInWithRedirect(auth, provider);
}
document.querySelector('#signin button').addEventListener('click', signIn);


 const collectMarker = async () => {
    if (activeMarker < 0) return;
    const collected = await alreadyCollected(activeMarker, auth.currentUser);
    if (!collected) {
        const ref = doc(db, "users", auth.currentUser.uid);
        await updateDoc(ref, {
            Collected: arrayUnion("Marker"+String(activeMarker))
        })
        console.log("Collected Marker")
    }
}
document.querySelector('#collect button').addEventListener('click', collectMarker);

export { collectedMarkers }