import React from 'react'
import "./BackButton.css";
import { useNavigate } from 'react-router';

function BackButton({home}) {
  const navigate = useNavigate();
  home = home || false;
  const onClick = home ? (() => navigate("/")) : (() => navigate(-1));
  return (
    <div id="backbutton">
        <button class="back-button" onClick={onClick}>
            <img src="/images/arrow_back.png" alt="back"></img> 
        </button>
    </div>
  )
}

export default BackButton