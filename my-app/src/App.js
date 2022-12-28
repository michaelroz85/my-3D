import React from "react";
import { FreeCamera, Vector3, HemisphericLight } from "@babylonjs/core";
import SceneComponent from "./components/SceneComponent"; 

import "./App.css";

const onSceneReady = (scene) => {

  const camera = new FreeCamera("camera1", new Vector3(1, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(4, 1, 0), scene);
  light.intensity = 0.7;
};

export default () => (
  <div className='app'>
   <h1 className='header'>Rick and Morty cool site</h1>
    <SceneComponent 
      antialias onSceneReady={onSceneReady} id="my-canvas" boxes="boxes">
      </SceneComponent>
  </div>
);

