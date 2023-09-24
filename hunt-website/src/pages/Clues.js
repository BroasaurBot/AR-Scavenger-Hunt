import React from 'react'
import {auth, db} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

import markers from '../info.js';
import GDSC_logo from '../components/GDSC_logo';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import "./css/clues.css"

function MarkerInfo({id, name, info, collected}) {
  return (
    <div class="marker-info shadow_box center">
      <div className="text-lg">
        {!collected && `Clue #${id}`}
        {collected && `${id} - ${name}`}
      </div>
      <div className="text-md">
        {`${info}`}
      </div>
    </div>
  )
}

function Clues() {

  const [option, setOption] = useState(0)
  const [user, setUser] = useState(null);
  const [collected, setCollected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        console.log("User signed in: ", newUser.displayName);
        setUser(newUser);
        onSnapshot(doc(db, "players", newUser.uid), (doc) => {
          if (doc.exists()) {
            setCollected(doc.data().collected);
          }
        });
      }else {
        console.log("User signed out");
        navigate("/SignIn");
      }
    });
  }, [user, navigate]);

  return (
    <div className="column mobile-width">
      <GDSC_logo></GDSC_logo>
      <BackButton></BackButton>

      <div className="title">Clues & Collected</div>
      <p className="text-md center pb-md">
        Select which option you would like to view
      </p>

      <div id="options" className="mb-md">
        <Button size={20} back_color={`${option===0?'#4285F4':'#FFFFFF'}`} onClick={() => setOption(0)}><div className="option">Clues</div></Button>
        <Button size={20} back_color={`${option===1?'#148D36':'#FFFFFF'}`} onClick={() => setOption(1)}><div className="option">Collected</div></Button>
      </div>

      {option===0 &&
        <p className="text-md center pb-md">
          {collected.length === markers.length && "Congratulations you have collected all the markers!"}
          {collected.length !== markers.length &&  "Here are some handy clue to help you find the remaining " + (markers.length - collected.length) + " markers!"}
        </p>}
      {option===1 &&
        <p className="text-md center pb-md">
          {collected.length===0 && "You haven't collected any markers yet!"}
          {collected.length > 0 && "You have collected " + collected.length + " markers!"}
        </p>}

        <div id="list" className="column">
          {markers.map((marker, index) => {
            if (option === 1 && collected.includes(marker.id)) {
              return (
                <MarkerInfo key={marker.id} id={marker.id} name={marker.name} info={marker.info} collected={true} />
              )
            }else if (option === 0 && !collected.includes(marker.id)) {
              return (
                <MarkerInfo key={marker.id} id={marker.id} name={marker.name} info={marker.clue} collected={false} />
              )
            }
            return (<div></div>);
          })}
        </div>
    </div>
  )
}

export default Clues