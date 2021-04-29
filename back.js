const canvas = document.getElementById('renderCanvas');

const BABYLON = require('@babylonjs/core')
require('babylon-vrm-loader')

const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 3, new BABYLON.Vector3(0, 1, 0), scene);
camera.setTarget(new BABYLON.Vector3(0, 1, 0));
camera.setPosition(new BABYLON.Vector3(0, 1, -1.5));
camera.minZ = 0.2;
camera.wheelDeltaPercentage = 0.01;
camera.attachControl(canvas, false);
new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, -1), scene);
window.currentScene = scene;

engine.runRenderLoop(function() {
  scene.render();
});
window.addEventListener('resize', function() {
  engine.resize();
});

// Update secondary animation
let translation = 0;
let a = false;
scene.onBeforeRenderObservable.add(() => {
  if (!scene.metadata || !scene.metadata.vrmManagers) {
    return;
  }
  const vrmManager = scene.metadata.vrmManagers[scene.metadata.vrmManagers.length - 1];
  translation += scene.getEngine().getDeltaTime();
  if (translation > 2000) {
    vrmManager.rootMesh.translate(new BABYLON.Vector3(0, 0, 1), a ? -1.0 : 1.0);
    translation = 0;
    a = !a;
  }
  vrmManager.update(scene.getEngine().getDeltaTime());
});

let fileCount = 0;
document.getElementById('select-file').addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  console.log(`loads ${file.name} ${file.size} bytes`);
  const currentMeshCount = scene.meshes.length;
  BABYLON.SceneLoader.Append('file:', file, scene, () => {
    console.log(`loaded ${file.name}`);
    for (let i = currentMeshCount; i < scene.meshes.length; i++) {
      //scene.meshes[i].translate(Vector3.Right(), 1.5 * fileCount);
    }
    fileCount++;
  });
})
