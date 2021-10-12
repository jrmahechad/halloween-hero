import "./style.css";

import { Clock } from "three";
import {
  TweakManager,
  MouseManager,
  CustomOrbitControls,
} from "webgl-party/packages/h3w/src";
import { loadHeroModels } from "./models";
import { setupLights, setupLightHelpers, createLightTweaks } from "./lights";
import { setupCamera, setupScene } from "./scene";
import {
  gsapCandyAnimation,
  getCandyIsAnimating,
  getBookIsAnimating,
  gsapBookAnimation,
  gsapJackOLanternAnimation,
  getJackOLanternIsAnimating,
} from "./animations";

const heroes = document.querySelectorAll(".hero > canvas");
const [canvas] = heroes;
const sceneObjects = new Map();

async function loadModels() {
  const models = await loadHeroModels();
  for (const [key, value] of models.entries()) {
    addModelToScene(key, value);
  }
  const book = sceneObjects.get("book").sceneObj;
  for (const child of book.children) {
    child.position.z = -0.2;
  }

  mouseManager.addEvent("mousemove", _createCandyBagIntersectable());
  mouseManager.addEvent("mousemove", _createBookIntersectable());
  mouseManager.addEvent("mousemove", _createJackOLanternIntersectable());
}

loadModels();

const lightsProperties = {
  directionalLight: {
    position: {
      x: 2,
      y: 2,
      z: -2.9,
    },
    color: 0xffffff,
    intensity: 0.3,
  },
  pointLight: {
    position: {
      x: -0.8,
      y: 0.7,
      z: 0,
    },
    color: 0x4bff00,
    intensity: 0.1,
    intensitySpeed: 2.5,
  },
  ambientLight: {
    position: {
      x: 2,
      y: 2,
      z: 2,
    },
    color: 0xffffff,
    intensity: 0.8,
  },
};

function animateCandy(candy) {
  if (getCandyIsAnimating()) {
    return;
  }
  gsapCandyAnimation(candy);
}

function animateJackOLantern(jackOLantern) {
  if (getJackOLanternIsAnimating()) {
    return;
  }
  gsapJackOLanternAnimation(jackOLantern);
}

function animateBook(book) {
  if (getBookIsAnimating()) {
    return;
  }

  gsapBookAnimation(book);
}

function _createJackOLanternIntersectable() {
  const jackOLantern = sceneObjects.get("jackOLantern");
  return {
    mesh: jackOLantern.sceneObj,
    enter: function enterJackOLantern() {
      animateJackOLantern(jackOLantern.sceneObj);
    },
  };
}

function _createCandyBagIntersectable() {
  const candyBag = sceneObjects.get("candybag");
  const candy = sceneObjects.get("candy");
  return {
    mesh: candyBag.sceneObj.children[0],
    enter: function enterCandyBag() {
      animateCandy(candy.sceneObj);
    },
  };
}

function _createBookIntersectable() {
  const book = sceneObjects.get("book");
  return {
    mesh: book.sceneObj.children[0],
    enter: function enterBook() {
      animateBook(book.sceneObj);
    },
  };
}

// Camera
const camera = setupCamera(canvas.clientWidth, canvas.clientHeight);

// Scene
const scene = setupScene(camera, canvas);

// Lights
const lights = setupLights(lightsProperties);
const [, directionalLight, pointLight] = lights;
const [pointLightHelper, directionalLightHelper] = setupLightHelpers(lights);
pointLightHelper.visible = false;
directionalLightHelper.visible = false;
scene.add(...lights);
scene.add(directionalLight.target);
scene.add(pointLightHelper);
scene.add(directionalLightHelper);

//
const mouseManager = new MouseManager(canvas, camera);

// Controls
const controls = new CustomOrbitControls(camera, canvas);

// Model
let model;

const clock = new Clock();

// Animation loop
function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  scene.update();
  mouseManager.update();

  // Update camera
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  pointLight.intensity = Math.sin(
    elapsedTime * lightsProperties.pointLight.intensitySpeed
  );

  directionalLightHelper.update();
  pointLightHelper.update();

  window.requestAnimationFrame(animate);
}

animate();

function addModelToScene(key, properties) {
  const gltf = properties.model;
  const [loadedModel] = gltf.scene.children;
  loadedModel.position.set(
    properties.position.x,
    properties.position.y,
    properties.position.z
  );
  loadedModel.scale.set(
    properties.scale.x,
    properties.scale.y,
    properties.scale.z
  );

  loadedModel.rotateX(properties.rotation.x);
  loadedModel.rotateY(properties.rotation.y);
  loadedModel.rotateZ(properties.rotation.z);

  sceneObjects.set(key, { ...properties, sceneObj: loadedModel });
  if (properties.display) {
    scene.add(loadedModel);
  }
}
