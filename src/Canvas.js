import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF, Environment, AccumulativeShadows, RandomizedLight, Decal, useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "./store";
import * as THREE from "three";

// position = [-1, .5, 2.5],  - loads camera at a big angle to the model
export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Canvas
    shadows
    eventSource={document.getElementById("root")}
    eventPrefix="client"
    camera={{ position, fov }}
  >
    <ambientLight intensity={0.5} />
    <Environment preset="city" />
    <CameraRig>
      <Backdrop />
      <Center>      
      <Shirt />      
      </Center>
      </CameraRig>
     {/* <OrbitControls /> */}
  </Canvas>
);

// backdrop
function Backdrop() {
  const shadows = useRef()

  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    )
  )
  


  return (<AccumulativeShadows
    ref={shadows}
    temporal // When temporal is set to true, the shadows will be smoothed out over time, resulting in less flickering and jittering
    frames={60} // fps
    alphaTest={0.85}
    scale={10} // scale of shadows
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -0.14]} // position of backdrop itself, last number moves it backward
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
// update the rotation property of a 3D object (referenced by the group.current object) based on the user's mouse movement
function CameraRig({ children }) {
  const group = useRef();  
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta)
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0], // higher numbers = less movement on mouse move
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

// load the model itself
function Shirt(props) {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF(`/shirt_baked.glb`);
  // for textures
  const texture = useTexture(`/${snap.selectedDecal}.png`)
     // smooths out the color change
     useFrame((state, delta) =>
     easing.dampC(materials.lambert1.color, snap.selectedColor, 0.25, delta)
   )
  
  materials.lambert1.color = new THREE.Color,(snap.selectedColor); // uses the color from the state

  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}>
      <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15}
        opacity={0.7}
        map={texture}
        map-anisotropy={16}
      />
    </mesh>
  )
}

          

useGLTF.preload(`/shirt_baked.glb`)
  ;[`/react.png`, `/three2.png`, `/pmndrs.png`].forEach(useTexture.preload)

