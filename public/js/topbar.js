import {lbInfo} from "./leaderboard.js";
import {points, collectedMarkers} from "./progress.js";
import {auth} from "./firebase.js";


let topVisible = false;

function renderTooltip(msg, name="") {
    let tooltip = document.querySelector('#tooltip');
    let topbar = document.getElementById("topbar");
    if (msg == "") {
        tooltip.classList.add("hide")
    } else {
        tooltip.classList.remove("hide");
        tooltip.querySelector("#characterName").innerHTML = name;
        tooltip.querySelector("#description").innerHTML = msg;
    }
}

function renderTopBar(t) {
    const topbar = document.getElementById("topbar");
    const close = document.getElementById("close");
    const info = document.getElementById("info"); 
    const background = document.getElementById("information")
    topVisible = t

    if (t == true) {
        document.querySelector('#Animation').classList.add("hide")
        topbar.classList.remove("hide");
        close.classList.remove("hide");
        info.classList.add("hide");
        background.style.background = "rgba(255, 117, 108 , 1)";

        if (auth != null && auth.currentUser != null)
            renderProgress();

    } else {
        topbar.classList.add("hide");
        info.classList.remove("hide");
        close.classList.add("hide");
        background.style.background = "rgba(255, 220, 108 , 1)";
    }
}

function renderProgress() {
    const info = lbInfo(points);
    console.log(info)
    const progress = document.getElementById("progress");
    progress.classList.remove("hide");

    const percent = collectedMarkers.length / markerInfo.length * 100;
    const progressBarFill = document.getElementById("progressBarFill");
    progressBarFill.style.width =  + percent.toString() + "%";

    const count = document.getElementById("count");
    count.innerHTML = collectedMarkers.length.toString() + "/" + markerInfo.length.toString();

    const p = document.getElementById("points");
    p.innerHTML = points.toString() + "pts";
    const prize = document.getElementById("prize");
    prize.innerHTML = (info.pos < 0 ? "" : info.pos + ": ") + info.tier ;

    const motivation = document.getElementById("motivation");
    let nextTier = "";
    if (info.tier == "Grand Prize") {
        nextTier = "Watchout another competitor is " + info.nextTier.toString() + "pts behind!";
    }else if (info.tier == "No Prize") {
        nextTier = "Earn " + info.nextTier.toString() + "pts to reach the minimum!";
    }else {
        nextTier = "Earn " + info.nextTier.toString() + "pts to unlock the next tier!";
    }
    motivation.innerHTML =  nextTier ;
}

function toggleTopBar() {
    topVisible = !topVisible
    renderTopBar(topVisible)
}
document.getElementById("information").addEventListener("click", toggleTopBar)
document.getElementById("logo").addEventListener("click", toggleTopBar)

export {renderTooltip, renderTopBar, renderProgress}