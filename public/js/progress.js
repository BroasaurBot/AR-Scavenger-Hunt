import { onAuthStateChanged, signInWithRedirect, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {auth, app, db, provider} from './firebase.js';
import { updateDoc, arrayUnion, getDoc, doc, onSnapshot, setDoc, increment } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { activeMarker, callHasCollected } from './markerEvents.js';
import { renderTooltip, renderTopBar, renderProgress } from "./topbar.js";
import { calculateCurrentScore, getTimeSinceStart, updateLeaderBoard, lbInfo} from "./leaderboard.js";

let collectedMarkers = [];
let points = 0;

onAuthStateChanged(auth, (user) => {
    const signin = document.getElementById('signIn');
    const bottombar = document.getElementById('bottombar');

    if (user) {
        console.log("Logged in " + user.displayName);
        signin.classList.add("hide");
        bottombar.classList.remove("hide");
        renderTopBar(false)
        setupDocument(user);

        const onCollect = onSnapshot(doc(db, "users", user.uid), (doc) => {
            let data = doc.data();
            if (data != undefined) {
                collectedMarkers = data.Collected;
                points = data.Points;
                console.log("Collected: ", collectedMarkers);

                callHasCollected();
                updateLeaderBoard(user.uid, points);
                renderProgress();
            }
        });

    } else {
        console.log("User not logged in");
        signin.classList.remove("hide");
        bottombar.classList.add("hide");
    }

    console.log("Time since start: ", getTimeSinceStart());
})

//Adds a document to the database if the user doesn't already have one
async function setupDocument(user) {
    const ref = doc(db, "users", user.uid);
    if ((await getDoc(ref)).exists()) {
        console.log("User already exists");
    }else {
        await setDoc(ref, {
            Collected: [],
            Count: 0,
            Points: 0
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
document.querySelector('#signIn button').addEventListener('click', signIn);


const collectMarker = async () => {
    if (activeMarker < 0) return;
    const collected = await alreadyCollected(activeMarker, auth.currentUser);
    if (!collected) {
        const ref = doc(db, "users", auth.currentUser.uid);
        await updateDoc(ref, {
            Collected: arrayUnion("Marker"+String(activeMarker)),
            Count: increment(1),
            Points: increment(calculateCurrentScore())
        })
        console.log("Collected Marker")
    }
}
document.querySelector('#interact').addEventListener('click', collectMarker);

export { collectedMarkers, points }