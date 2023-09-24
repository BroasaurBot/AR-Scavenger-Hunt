import React from 'react'
import {addUserLeaderboard, getPosition } from '../util/leaderboard'
import { auth, db } from '../firebase';
import { doc, onSnapshot, query, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import './css/stats.css'
import GDSC_logo from '../components/GDSC_logo';
import BackButton from '../components/BackButton';


function Stats() {

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [position, setPosition] = useState({pos: -1, next: 0, status:"NONE"});
  const navigate = useNavigate();

  //Log in the user, if not sign them in 
  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        console.log("User signed in: ", newUser.displayName);
        setUser(newUser);
      }else {
        console.log("User signed out");
        navigate("/SignIn");
        
      }
    });
  }, [navigate]);

  //Get the user's info
  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "players", user.uid), (doc) => {
        if (doc.exists()) {
          setUserInfo(doc.data());
        }
      });
    }
  }, [user]);
  
  //Get the leaderboard
  useEffect(() => {
    const q = query(collection(db, "leaderboard"));
    onSnapshot(q, (querySnapshot) => {
      let leaderboard = [];
      querySnapshot.forEach((doc) => {
        leaderboard.push(doc.data());
      });
      leaderboard.sort((a, b) => {return b.points - a.points});
      leaderboard = leaderboard.slice(0, 20);
      setLeaderboard(leaderboard);
    });
  }, [userInfo]);

  //Add the user to the leaderboard and calculate their position
  useEffect(() => {
    if (userInfo && leaderboard) {
      console.log("Adding user to leaderboard");
      addUserLeaderboard(userInfo);
      setPosition(getPosition(leaderboard, userInfo)) 
    }
  }, [userInfo, leaderboard]);
    
  return (
    <div id="stats" class="column mobile-width">
      <BackButton home></BackButton>
      <GDSC_logo></GDSC_logo>
      <div class="title mb-md">
        Leaderboard
      </div>

      {userInfo && position && 
        <div class="shadow_box mb-md" id="info">
          <div class="center-tag round-border yellow-back white-text">You achievements</div>
          <p class="text-md">Points: {userInfo.points}pts</p>
          <p class="text-md">Position: {position.pos}</p>
          <p class="text-md">Prize-tier level: {position.status}</p>
          <p class="text-md">Unlock next tier by earning: {position.next}pts</p>
        </div>
      }

      <div id='leaderboard'>
        <div id="board-title" class="mb-sm">
          <p class="text-lg bold green-text">Name</p>
          <p class="text-lg bold blue-text">Points</p>
          <p class="text-lg bold red-text">Rank</p>
        </div>
        <div id="board-list">
          {leaderboard && leaderboard.map((player, index) => {
            return (
              <div id="player" class='shadow_box' key={player.name}>
                <div id="player-info" class="text-md">{player.name}</div>
                <div id="player-info" class="text-md">{player.points}pts</div>
                <div id="player-info" class="text-md">{index + 1}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Stats