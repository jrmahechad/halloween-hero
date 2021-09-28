import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  PointLightHelper,
  PointLight,
} from "three";
function setupLights(lightsProperties) {
  const lights = [];

  const ambientLight = new AmbientLight(
    lightsProperties.ambientLight.colors,
    lightsProperties.ambientLight.intensity
  );
  lights.push(ambientLight);

  const directionalLight = new DirectionalLight(
    lightsProperties.directionalLight.color,
    lightsProperties.directionalLight.intesity
  );
  directionalLight.in;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.camera.left = -7;
  directionalLight.shadow.camera.top = 7;
  directionalLight.shadow.camera.right = 7;
  directionalLight.shadow.camera.bottom = -7;
  directionalLight.position.set(
    lightsProperties.directionalLight.position.x,
    lightsProperties.directionalLight.position.y,
    lightsProperties.directionalLight.position.z
  );
  directionalLight.target.position.set(0, 0, -2);

  const pointLight = new PointLight(
    lightsProperties.pointLight.color,
    lightsProperties.pointLight.intensity
  );
  pointLight.position.set(
    lightsProperties.pointLight.position.x,
    lightsProperties.pointLight.position.y,
    lightsProperties.pointLight.position.z
  );

  lights.push(directionalLight);
  lights.push(pointLight);

  return lights;
}

function setupLightHelpers(lights) {
  const [, directionalLight, pointLight] = lights;
  const pointLightHelper = new PointLightHelper(pointLight, 0.5);
  const directionalLightHelper = new DirectionalLightHelper(
    directionalLight,
    0.5
  );

  return [pointLightHelper, directionalLightHelper];
}

function createLightTweaks(lightsProperties, lights, helpers) {
  const [, directionalLight, pointLight] = lights;
  const [pointLightHelper, directionalLightHelper] = helpers;
  const directionalTweaks = [
    {
      baseObj: directionalLight,
      property: "intensity",
      min: 0,
      max: 1,
      step: 0.001,
      name: "Intensity",
    },
    {
      baseObj: directionalLight.position,
      property: "x",
      min: -4,
      max: 4,
      step: 0.001,
      name: "X",
    },
    {
      baseObj: directionalLight.position,
      property: "y",
      min: -4,
      max: 4,
      step: 0.001,
      name: "Y",
    },
    {
      baseObj: directionalLight.position,
      property: "z",
      min: -4,
      max: 4,
      step: 0.001,
      name: "Z",
    },
    {
      baseObj: lightsProperties.directionalLight,
      property: "color",
      isColor: true,
      callback: (value) => {
        directionalLight.color.set(value);
      },
      name: "Color",
    },
  ];
  const pointTweaks = [
    {
      baseObj: lightsProperties.pointLight,
      property: "intensitySpeed",
      min: 0,
      max: 3,
      step: 0.001,
      name: "Intensity Speed",
    },
    {
      baseObj: pointLight.position,
      property: "x",
      min: -4,
      max: 4,
      step: 0.001,
      name: "X",
    },
    {
      baseObj: pointLight.position,
      property: "y",
      min: -4,
      max: 4,
      step: 0.001,
      name: "Y",
    },
    {
      baseObj: pointLight.position,
      property: "z",
      min: -4,
      max: 4,
      step: 0.001,
      name: "Z",
    },
    {
      baseObj: lightsProperties.pointLight,
      property: "color",
      isColor: true,
      callback: (value) => {
        pointLight.color.set(value);
      },
      name: "Color",
    },
  ];
  const helpersTweaks = [
    {
      baseObj: directionalLightHelper,
      property: "visible",
      name: "Directional Light",
    },
    {
      baseObj: pointLightHelper,
      property: "visible",
      name: "Point Light",
    },
  ];
  return [
    { isGroup: true, children: directionalTweaks, name: "Directional Light" },
    { isGroup: true, children: pointTweaks, name: "Point Light" },
    { isGroup: true, children: helpersTweaks, name: "Helpers" },
  ];
}

export { setupLights, setupLightHelpers, createLightTweaks };
