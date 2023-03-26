import { onAuthStateChanged, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {auth, app, db, provider} from './firebase.js';
import { updateDoc, arrayUnion, getDoc, doc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
import { activeMarker, callHasCollected } from './markerEvents.js';

let collectedMarkers = [];
onAuthStateChanged(auth, (user) => {
    const signin = document.getElementById('signin');
    const collect = document.getElementById('collect');

    if (user) {
        console.log("Logged in " + user.displayName);
        signin.style.display="none";
        collect.style.display="inline";

        const onCollect = onSnapshot(doc(db, "users", user.uid), (doc) => {
            collectedMarkers = doc.data().Collected;
            console.log("Checking collected: ", collectedMarkers);

            callHasCollected();
        });

    } else {
        console.log("User not logged in");
        collect.style.display="none";
        signin.style.display="inline";
    }
})


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