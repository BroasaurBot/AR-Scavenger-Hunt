import { onAuthStateChanged, signInWithRedirect, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {auth, app, db, provider} from './firebase.js';
import { updateDoc, arrayUnion, getDoc, doc, onSnapshot, setDoc, increment } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { activeMarker, renderInspector } from './markerEvents.js';
import { renderTooltip, renderProgress, renderSignIn } from "./topbar.js";
import { calculateCurrentScore, getTimeSinceStart} from "./leaderboard.js";

let collectedMarkers = [];
let points = 0;

await onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log("Logged in " + user.displayName);
        setupDocument(user);
        renderProgress();

        const onCollect = onSnapshot(doc(db, "players", user.uid), (doc) => {
            let data = doc.data();
            if (data != undefined) {
                collectedMarkers = data.collected;
                points = data.points;
                console.log("Collected: ", collectedMarkers);

                renderProgress();
            }
        });

    } else {
        console.log("User not logged in");
        renderSignIn()
    }

    console.log("Time since start: ", getTimeSinceStart());
})

//Adds a document to the database if the user doesn't already have one
async function setupDocument(user) {
    const ref = doc(db, "players", user.uid);
    if ((await getDoc(ref)).exists()) {
        console.log("User already exists");
    }else {
        await setDoc(ref, {
            collected: [],
            count: 0,
            points: 0
        });
    }
}

//Checks if the users has already collected the marker with id
async function alreadyCollected(id, user) {
    const querySnapshot = await getDoc(doc(db, "players", user.uid));
    if (querySnapshot.exists()) {
        return querySnapshot.data().collected.includes(String(id));
    }else return false;
}

const collectMarker = async () => {
    if (activeMarker < 0) return;
    const collected = await alreadyCollected(activeMarker, auth.currentUser);
    if (!collected) {
        const ref = doc(db, "players", auth.currentUser.uid);
        await updateDoc(ref, {
            collected: arrayUnion(String(activeMarker)),
            count: increment(1),
            points: increment(calculateCurrentScore())
        })
        console.log("Collected Marker")
        renderInspector(true, activeMarker);
    } else {
        console.log("Already collected marker")
        renderTooltip(markerInfo[activeMarker].description, markerInfo[activeMarker].name);
    }
}
document.querySelector('#interact').addEventListener('click', collectMarker);

const signIn = () => {
    signInWithPopup(auth, provider);
}
document.querySelector('#signIn button').addEventListener('click', signIn);

export { collectedMarkers, points }