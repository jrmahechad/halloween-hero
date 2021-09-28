import { PerspectiveCamera } from "three";
import { ResizableScene } from "webgl-party/packages/h3w/src";

function setupCamera(width, height) {
  const camera = new PerspectiveCamera(75, width / height);
  camera.position.x = 0;
  camera.position.y = 0.85;
  camera.position.z = 3;

  window._camera = camera;

  return camera;
}

function setupScene(camera, element) {
  const params = {
    element,
    camera,
    rendererParams: {
      alpha: true,
    },
  };

  const scene = new ResizableScene(params);

  window._scene = scene;

  return scene;
}

export { setupCamera, setupScene };
