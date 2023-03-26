import { collectedMarkers } from "./progress.js";

AFRAME.registerComponent('markerhandler', {
    init: function () {
      console.log("Marker Initialisation")
      this.el.sceneEl.addEventListener('markerFound', (e) => {
        foundMarker(e.srcElement.attributes[2].value);
      })
      this.el.sceneEl.addEventListener('markerLost', (e) => {
        lostMarker(e.srcElement.attributes[2].value);
      })
    }
  });
  AFRAME.scenes[0].setAttribute('markerhandler','');

  var closeTimer;
  var activeMarker = -1;
  function foundMarker(id) {
        activeMarker = id;
        clearTimeout(closeTimer)
        renderPopup(true, id);
  }

  function lostMarker(id) {
        clearTimeout(closeTimer)
        closeTimer = setTimeout(() => {
            renderPopup(false, -1);
            activeMarker = -1;
        }, 5000);
  }

  function renderPopup(show, id) {
    let popup = document.getElementById('popup');
    let text = document.getElementById('marker-info');
    if (show == true) {
        popup.classList.add("show")
        text.innerHTML = "You found marker " + markerInfo[id].name;
        
        hasCollected(activeMarker, collectedMarkers);
    }else {
        popup.classList.remove("show")
    }
  }

function hasCollected(id, collectedMarkers) {
    let collect = document.querySelector('#collect p')
    let button = document.querySelector('#collect button');

    if (collectedMarkers.includes("Marker"+String(id))) {
        collect.innerHTML = "You have already collected the marker";
        button.style.visibility = "hidden";
    } else {
        collect.innerHTML = "Tap here to collected marker";
        button.style.visibility = "visible";
    }
}

const callHasCollected = () => {
    hasCollected(activeMarker, collectedMarkers);
}

  export { activeMarker, callHasCollected };