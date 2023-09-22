import {points, collectedMarkers} from "./progress.js";
import {auth} from "./firebase.js";

function renderTooltip(msg, name="") {
    let middle = document.querySelector('#middle');
    middle.classList.remove("hide");
    middle.querySelector("#characterName").innerHTML = name;
    middle.querySelector("#description").innerHTML = msg;
}
document.querySelector('#close').addEventListener('click', hideTooltip);
document.querySelector('#close img').ondragstart = () => {return false};

function hideTooltip() {
    console.log("Hiding tooltip");
    let middle = document.querySelector('#middle');
    middle.classList.add("hide");
}

function renderProgress() {
    document.getElementById("progress").classList.remove("hide");
    document.getElementById("signIn").classList.add("hide");

    const percent = collectedMarkers.length / markerInfo.length * 100;
    const progressBarFill = document.getElementById("progressBarFill");
    const dot = document.getElementById("dot");
    progressBarFill.style.width =  + percent.toString() + "%";
    dot.style.setProperty("margin-left", 'calc(' + percent.toString() + '% - 10px)');

    const count = document.getElementById("count");
    count.innerHTML = collectedMarkers.length.toString() + "/" + markerInfo.length.toString();

    const p = document.getElementById("points");
    p.innerHTML = points.toString() + "pts";
}

function renderSignIn() {
    document.getElementById("progress").classList.add("hide");
    document.getElementById("signIn").classList.remove("hide");
    return;
}

export {renderTooltip, hideTooltip, renderProgress, renderSignIn}