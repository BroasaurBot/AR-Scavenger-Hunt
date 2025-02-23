import React from 'react'

import GDSC_logo from '../components/GDSC_logo';
import Button from '../components/Button';

import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { query, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import BackButton from '../components/BackButton';

async function clearLeaderboard() {
    console.log("Clearing the leaderboard")
    const   q = query(collection(db, "leaderboard"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

async function removeFakePlayers() {
    console.log("Clearing the leaderboard")
    const   q = query(collection(db, "leaderboard"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc.id.includes("BOT")) deleteDoc(doc.ref);
    });
}

async function createFakePlayers(count) {
    console.log("Creating fake players")
    for (let i = 0; i < count; i++) {
        await setDoc(doc(db, "leaderboard", "BOT" + i.toString()), {
            uid: "BOT" + i.toString(),
            name:"BOT" + i.toString(),
            points: i * 100
        });
    }
}

async function getLeaderboard() {
    const q = query(collection(db, "leaderboard"));
    const querySnapshot = await getDocs(q);
    let leaderboard = [];
    querySnapshot.forEach((doc) => {
        leaderboard.push(doc.data());
    });
    return leaderboard;
}

async function printPlayerStats() {
  const q = query(collection(db, "players"));
  const querySnapshot = await getDocs(q);
  let players = []
  querySnapshot.forEach((doc) => {
    players.push(doc.data());
  });

  let total_collected = 0;
  let total_points = 0;
  let total_players = players.length;
  let max_collected = 0;

  for (let i = 0; i < players.length; i++) {
    total_collected += players[i].collected.length;
    total_points += players[i].points;
    if (players[i].collected.length > max_collected) {
      max_collected = players[i].collected.length;
    }
  }

  let average_collected = total_collected / total_players;
  let average_points = total_points / total_players;

  let res = "Player Stats:\n";
  res += `Total players: ${total_players}\n`;
  res += 'Average collected: ' + average_collected.toFixed(2) + '\n';
  res += 'Average points: ' + average_points.toFixed(2) + '\n';
  res += 'Max collected: ' + max_collected + '\n';

  alert(res);
  console.log(res);

}

function printLeaderboard(leaderboard) {
    leaderboard.sort((a, b) => {return b.points - a.points});
    let res = "Leaderboard:\n";
    for (let i = 0; i < leaderboard.length; i++) {
      res += `${i + 1} ${leaderboard[i].name} ${leaderboard[i].email??""} ${leaderboard[i].points} ${leaderboard[i].uid}\n`;
    }
    alert(res);
    console.log(res);
}

function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        console.log("User signed in: ", newUser.displayName);
        getDoc(doc(db, "admin", "authenticated")).then((doc) => {
          console.log(doc.data())
          if (doc.exists() && doc.data().users.includes(newUser.uid)) {
            setAuthenticated(true);
          }else {
            navigate("/");
          }
        });
        
      }else {
        console.log("User signed out");
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="column mobile-width">
      <GDSC_logo></GDSC_logo>
      <BackButton></BackButton>

      <div className="title">
        Admin
      </div>

      {authenticated && 
      <>
      <Button  size={15} onClick={() => {createFakePlayers(20)}}>Create fake players</Button>
      <Button  size={15} onClick={() => {removeFakePlayers()}}>Remove fake players</Button>
      <Button  size={15} onClick={() => {getLeaderboard().then((doc => {
        printLeaderboard(doc);
        }))}}
      >Print leaderboard information</Button>
      <Button  size={15} onClick={() => {printPlayerStats()}}>Print player information</Button>
      </>
      }
      <div className="pb-md"></div>

      <p className="text-sm center">
      © Google Developer Student Club - The University of Sydney
      </p>

    </div>
  )
}

export default Admin