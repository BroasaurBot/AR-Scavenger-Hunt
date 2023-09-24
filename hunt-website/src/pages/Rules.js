import React, {useState} from 'react'
import {auth} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import "./css/signIn.css"
import GDSC_logo from '../components/GDSC_logo';
import Button from '../components/Button';
import BackButton from '../components/BackButton';


function Rules() {

  let [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User signed in: ", user.displayName);
      setUser(user);
    }else {
      console.log("User signed out");
      setUser(null);
    }
  });

  return (
    <div class="column mobile-width pb-md">
      <BackButton></BackButton>
      <GDSC_logo></GDSC_logo>

      <div class="title">
        Rules
      </div>
      <div id="rules" class="round-border mb-md">
        <p class="text-md center">
        Always abide by these to ensure others can also have a great time: <br/>
        </p>
        <ul id="list" class="left text-md pb-sm">
          <li>★ Do not enter any areas that are usually restricted for students</li>
          <li>★ Do not damage the posters</li>
          <li>★ Never share the location of a poster with any other competitor</li>
          </ul>
        <p class="text-md">
          Once you have logged in via Google, points can be awarded for each marker you scan. More points are awarded earlier in the competition than later, so get hunting right away! 
        </p>
      </div>

      <div class="title">
        Tips and Tricks
      </div>
      <div id="rules" class="round-border mb-md">
        <p class="text-md center">
        Always abide by these to ensure others can also have a great time: <br/>
        </p>
        <ul id="list" class="left text-md pb-sm">
          <li>★ Do not enter any areas that are usually restricted for students</li>
          <li>★ Do not damage the posters</li>
          <li>★ Never share the location of a poster with any other competitor</li>
          </ul>
        <p class="text-md">
          Once you have logged in via Google, points can be awarded for each marker you scan. More points are awarded earlier in the competition than later, so get hunting right away! 
        </p>
      </div>

      <div class="mb-md">

      </div>
      <div class="title">
        Start playing now!
      </div>
      {user && 
        <Button  size={20} back_color="#4285F4" color="#FFFFFF" redirect={"https://gdsc-ar-hunt-camera.web.app/"}>Play Now</Button>
      }
      {!user &&
        <Button  size={20} back_color="#4285F4" color="#FFFFFF" redirect={"./SignIn"}>Play Now</Button>
      }

    </div>
  )
}

export default Rules