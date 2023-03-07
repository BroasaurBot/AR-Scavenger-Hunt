const scene =  `
    <a-scene embedded arjs
        vr-mode-ui="enabled: false">
        <a-marker preset="hiro">
            <a-entity
                position="0 0 0"
                scale="1 1 1"
                gltf-model="/models/shiba/scene.gltf"
            ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
    </a-scene>
`;
export default scene;