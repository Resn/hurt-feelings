import { Color, Vector3 } from "three";

export const pointsToBufferArray = (points) => {
  const output = [];
  points.forEach((p) => output.push(p.x, p.y, p.z));
  return output;
};


// note camera must be aligned to z-axis.
// note  - object3d is the object you want moved in x,y values based on its z-depth to camera,  to align to the pixelVec2
const tempPixelVector3 = new Vector3();
export const pixelPositionToPerspectivePosition = (
  object3D,
  camera,
  pixelVec2,
  viewPortWidth,
  viewPortHeight,
  targetVector = tempPixelVector3,
) => {
  // Convert the pixel-space 2D coordinate to NDC (Normalized Device Coordinates)
  const ndcX = (pixelVec2.x / viewPortWidth) * 2 - 1;
  const ndcY = -(pixelVec2.y / viewPortHeight) * 2 + 1;

  // Create a vector in normalized device coordinates (NDC)
  targetVector.x = ndcX;
  targetVector.y = ndcY;
  targetVector.z = -1;

  // Unproject the vector from 2D to 3D space
  targetVector.unproject(camera);

  // Set the distance from the camera to object (z-coordinate)
  const distance = object3D.position.distanceTo(camera.position);

  // Get the direction from the camera to the point in world space
  targetVector.sub(camera.position).normalize();

  // Set the calculated z-distance to maintain the object's current z-position
  targetVector.multiplyScalar(distance);
  targetVector.add(camera.position);

  // use the output to set the object3D position
  return targetVector;
};


const tempVector3 = new Vector3()
export const object3DToPixelPosition = (object3D, camera,  viewPortWidth, viewPortHeight, targetVector = tempVector3)=>{
  const vector = targetVector || tempVector
  object3D.updateMatrixWorld() // `obj´ is a THREE.Object3D
  vector.setFromMatrixPosition(object3D.matrixWorld)
  vector.project(camera) // `camera` is a THREE.PerspectiveCamera

  // to pixel space
  vector.x = (0.5 + vector.x / 2) * viewPortWidth
  vector.y = (0.5 - vector.y / 2) * viewPortHeight
  vector.z = 0 - vector.z // TODO bug? orthographic z is flipped?

  // don't retain output vector if targetVector not defined in arguments
  return vector
}


