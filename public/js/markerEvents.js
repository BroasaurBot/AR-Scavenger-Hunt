import { collectedMarkers } from "./progress.js";
import { renderTooltip } from "./topbar.js";

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
    let collect = document.querySelector('#marker-inspector > p')
    const button = document.querySelector('#interact');
    if (show == true) {
        hasCollected(activeMarker, collectedMarkers);
    }else {
        collect.innerHTML = "Go search for a marker";
        renderTooltip("")
    }
  }

//Changes the rendering of popup
function hasCollected(id, collectedMarkers) {
    let collect = document.querySelector('#marker-inspector > p')

    if (activeMarker == id && id != -1) {
      if (collectedMarkers.includes("Marker"+String(id))) {
          collect.innerHTML = markerInfo[id].name + "!";
          renderTooltip(markerInfo[id].description, markerInfo[id].name)
      } else {
          renderTooltip("");
      }
    }
}

const callHasCollected = () => {
    hasCollected(activeMarker, collectedMarkers);
}

  export { activeMarker, callHasCollected };