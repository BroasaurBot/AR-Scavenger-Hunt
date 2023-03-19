
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

  var closeTimer;
  var activeMarker = -1;

  function foundMarker(id) {
        //console.log("Marker Found: " +  String(id));
        activeMarker = id;
        clearTimeout(closeTimer)
        renderPopup(true, id);
  }

  function lostMarker(id) {
        //console.log("Marker Lost: " +  String(id));
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
    }else {
        popup.classList.remove("show")
    }
  }
