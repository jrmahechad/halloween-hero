import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { GltfModelLoader } from "webgl-party/packages/h3w/src";

async function _loadModels(models) {
  const promises = [];
  const gltfLoader = GltfModelLoader.getInstance();
  await gltfLoader.setDracoLoader(`https://s3.amazonaws.com/examples.webgl-party/draco/`);

  const keys = [];

  for (const [key, value] of models.entries()) {
    promises.push(gltfLoader.getModelAsync(value.url));
    keys.push(key);
  }

  try {
    const responses = await Promise.all(promises);
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const key = keys[i];
      models.set(key, { ...models.get(key), model: response });
    }

    return models;
  } catch (error) {
    console.log(`Something went wrong loading models: ${error}`);
  }
}

function _setupModelFallback() {
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  const cubeMaterial = new MeshBasicMaterial({
    color: "#ff0000",
    wireframe: true,
  });
  const cubeMesh = new Mesh(cubeGeometry, cubeMaterial);

  return cubeMesh;
}

async function loadHeroModels() {
  const models = new Map();
  models.set("bookcase", {
    url: `https://s3.amazonaws.com/examples.webgl-party/models/halloween/bookcase.gltf`,
    position: new Vector3(0, -2.5, 0),
    scale: new Vector3(1.5, 1.5, 1.5),
    rotation: new Vector3(0, 0, 0),
    display: true,
  });
  models.set("candybag", {
    url: `https://s3.amazonaws.com/examples.webgl-party/models/halloween/candy-bag.gltf`,
    position: new Vector3(0.8, 0.75, 0),
    scale: new Vector3(0.45, 0.45, 0.45),
    rotation: new Vector3(0, -(Math.PI * 1) / 8, 0),
    display: true,
  });
  models.set("candy", {
    url: `https://s3.amazonaws.com/examples.webgl-party/models/halloween/candy.gltf`,
    position: new Vector3(0.8, 0.9, 0),
    scale: new Vector3(0.3, 0.3, 0.3),
    rotation: new Vector3(0, (Math.PI * 1) / 1, 0),
    display: true,
  });
  models.set("jackOLantern", {
    url: `https://s3.amazonaws.com/examples.webgl-party/models/halloween/jack-o-lantern.gltf`,
    position: new Vector3(-0.8, 0.7, 0),
    scale: new Vector3(0.5, 0.5, 0.5),
    rotation: new Vector3(0, (Math.PI * 1) / 8, 0),
    display: true,
  });
  models.set("book", {
    url: `https://s3.amazonaws.com/examples.webgl-party/models/halloween/book.gltf`,
    position: new Vector3(0.69, -0.65, 0.25),
    scale: new Vector3(1.5, 1.5, 1.5),
    rotation: new Vector3(0, -Math.PI / 4, Math.PI * 1.5),
    display: true,
  });

  return await _loadModels(models);
}

export { loadHeroModels };
