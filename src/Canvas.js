import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF, Environment, AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import React, { useRef } from "react";
import { easing } from "maath";

// position = [-1, .5, 2.5],  - loads camera at a big angle to the model
export const App = ({ position = [0, .5, 2.5], fov = 75 }) => (
  <Canvas
    shadows
    eventSource={document.getElementById("root")}
    eventPrefix="client"
    camera={{ position, fov }}
  >
    <ambientLight intensity={0.5} />
    <Environment preset="city" />
    <CameraRig>
      <Center>      
      <Shirt />
      <Backdrop />
      </Center>
      </CameraRig>
    <OrbitControls />
  </Canvas>
);

// backdrop
function Backdrop() {
  return( <AccumulativeShadows
    temporal // When temporal is set to true, the shadows will be smoothed out over time, resulting in less flickering and jittering
    frames={60} // fps
    alphaTest={0.85}
    scale={10} // scale of shadows
    rotation={[Math.PI / 2, 0, 0]}
    position={[-.01, 0, -1]} // position of backdrop itself, last number moves it backward
  > 
    <RandomizedLight
      amount={4}
      radius={9}
      intensity={0.55}
      ambient={.25}
      position={[5,5,-10]}
    />
    <RandomizedLight
      amount={8}
      radius={9}
      intensity={0.55}
      ambient={.25}
      position={[5,5,-10]}
    />
  </AccumulativeShadows>
  )
}

function Shirt(props) {
  const { nodes, materials } = useGLTF("/baseball_hat.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.labert1}
      />
    </group>
  );
}

// update the rotation property of a 3D object (referenced by the group.current object) based on the user's mouse movement
function CameraRig({ children }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 3, -state.pointer.x / 3, 0], // higher numbers = less movement on mouse move
      0.25, // responseiveness
      delta // (delta) determines how quickly the update occurs. 
    )
  })

  return (
    <group ref={group}>
      {children}
    </group>
  )  
}

useGLTF.preload("/baseball_hat.glb");