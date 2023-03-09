import React from 'react'
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"

function ARPortal() {

  return(
    <div
        ref={mount => { this.mount = mount}}
    >
      <ARCanvas
      camera={ { position: [0, 0, 0] } }
      onCreated={ ({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight)
      } }>
        <ambientLight />
        <pointLight position={ [10, 10, 0] }  />
        <ARMarker
          type={ "pattern" }
          patternUrl={ "patterns/patt.hiro" }>
          <mesh>
            <boxBufferGeometry args={ [1, 1, 1] } />
            <meshStandardMaterial color={ "green" } />
          </mesh>
        </ARMarker>
    </ARCanvas>,
    </div>
  )
}
export default ARPortal;