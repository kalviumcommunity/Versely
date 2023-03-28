import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import model from "../asset/untitled.gltf";

// import { useGLTF, OrthographicCamera } from "@react-three/drei";

// function Model() {
//   const { nodes } = useGLTF("/untitled.glb");
//   return (
//     <mesh>
//       <boxBufferGeometry attach="geometry" />
//       <meshLamberMaterial attach="material" color="hotpink" />
//     </mesh>
//   );
// }

// useGLTF.preload("/untitled.glb");

function Error() {
  return (
    <div className="error-container">
      <h1>Uh-Oh...</h1>
      <h4>
        The page you are looking for may have been moved, deleted,
        <br />
        or possibly never existed.
      </h4>
      <h1 className="error404">404</h1>
    </div>
  );
}

export default Error;
