import {auth, app, db, provider} from './firebase.js';
import { updateDoc, getDoc, doc, deleteDoc, collection, getDocs, setDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"

//const start = 1681084801000;
const officialStart = 1681689601000;
const numberOfPositions = 20;
const minPoints = 500;

let lbPos = -1;
let leaderBoard = [];

function calculateScore(time) {
    return Math.floor(100 + 100 * Math.exp(-0.6 * time));
}

function getTimeSinceStart() {
    const now = new Date();
    return (now.getTime() - officialStart) / (1000*60*60*24);
}

function calculateCurrentScore() {
    return calculateScore(getTimeSinceStart());
}

async function getLeaderBoard() {
   const snapshots = await getDocs(collection(db, "leaderboard")); 
    
   leaderBoard = [];
   snapshots.forEach((doc) => {
        if (auth.currentUser != null && auth.currentUser.uid != doc.data().uid) {
            leaderBoard.push(doc.data());
        }
    });
    leaderBoard.sort((a, b) => {
        return b.Points - a.Points;
    });

    return leaderBoard;
}

async function updateLeaderBoard(uid, points) {

    if (points >= minPoints) {
        await getLeaderBoard();

        let i = 0;
        for (; i < leaderBoard.length && i < numberOfPositions; i++) {
            if (leaderBoard[i].Points < points) {
                leaderBoard.splice(i, 0, {uid: uid, Points: points, email: auth.currentUser.email});
                break;
            }
        }
        if (i < numberOfPositions) {
            lbPos = i + 1;
            const snapdoc = await getDoc(doc(db, "leaderboard", uid));
            if (snapdoc.exists()) {
                await updateDoc(doc(db, "leaderboard", uid), {
                    Points: points
                });
            } else {
                await setDoc(doc(db, "leaderboard", uid), {
                    Points: points,
                    email: auth.currentUser.email,
                    uid: uid
                });
            }

            while (leaderBoard.length > numberOfPositions) {
                const removed = leaderBoard.pop();
                await deleteDoc(doc(db, "leaderboard", removed.uid));
            }

        }

    }else {
        lbPos = -1;
    }
}

async function insertMin() {
    for(let i = 1; i < numberOfPositions + 1; i++) {
        await setDoc(doc(db, "leaderboard", "M"+i.toString()), {
            Points: 500 ,
            uid: "M"+i.toString(),
        });
    }
}
async function deleteAll() {
    for(let i = 1; i < numberOfPositions + 1; i++) {
        await deleteDoc(doc(db, "leaderboard", i.toString()));
    }
}

function lbInfo(points) {
    let tier = "";
    let nextTier = 0;

    if (lbPos != -1 && leaderBoard.length > 0) {
        tier = "Low tier prize";
        nextTier = leaderBoard[numberOfPositions / 2 - 1].Points - points + 1;
        if (lbPos <= numberOfPositions / 2) {
            tier = "Mid tier prize";
            nextTier = leaderBoard[numberOfPositions / 4 - 1].Points - points + 1;
        }
        if (lbPos <= numberOfPositions / 4) {
            tier = "High tier prize";
            nextTier = leaderBoard[0].Points - points + 1;
        }
        if (lbPos == 1) {
            tier = "Grand Prize";
            nextTier = points - leaderBoard[1].Points + 1;
        }

        //Determines the ending string: th, st, nd, rd
        let ending = "th";
        if (lbPos % 10 - 1  == 0) {
            ending = "st";
        } else if (lbPos % 10 - 2 == 0) {
            ending = "nd";
        } else if (lbPos % 10 - 3 == 0) {
            ending = "rd";
        }
        const position = lbPos.toString() + ending;

        return {pos: position, nextTier: nextTier, tier:tier};

    } else {
        return{pos: -1, nextTier: minPoints - points,  tier:"No prize", p:points}
    }
}

export {lbInfo, getTimeSinceStart, calculateCurrentScore, getLeaderBoard, updateLeaderBoard} 