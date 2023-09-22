import { auth } from "./firebase.js";
import { collectedMarkers, loggedInUser } from "./progress.js";

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

  //This function is called when a marker is found
  function foundMarker(id) {
    activeMarker = id;
    clearTimeout(closeTimer)
    renderInspector(true, id);
  }

  function lostMarker(id) {
    clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
        renderInspector(false, -1);
        activeMarker = -1;
    }, 10000);
  }

  function renderInspector(show, id) {
    let button = document.getElementById('interact');
    if (loggedInUser == null) 
      return;
    if (show == true) {
        button.classList.remove("hide");

        if (activeMarker == id && id != -1) {
            if (collectedMarkers.includes(String(id))) {
                button.innerHTML = "Information";
                button.classList.remove("rainbow");
            } else {
                button.innerHTML = "Collect";
                button.classList.add("rainbow");
            }
        }

    }else {
        button.classList.add("hide");
    }
  }

  export { activeMarker, renderInspector};