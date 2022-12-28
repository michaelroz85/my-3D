import { useEffect, useState, useRef } from "react";
import "./../styles.css"
import {
  Engine,
  Scene,
  MeshBuilder
} from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  TextBlock,
} from '@babylonjs/gui';
import * as BABYLON from '@babylonjs/core'

export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);
  const [result, setResult] = useState([]);
  const [filter, setFilter] = useState();
  const [filteredChar, setFilteredchars] = useState([]);
  let chracter;
  let characters = [];
  let scene;
  let data;
  useEffect(() => {
    let { current: canvas } = reactCanvas;
    canvas.width = 1222
    canvas.height = 1000
    if (!canvas) return;
    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    scene = new Scene(engine, sceneOptions);

    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onSceneReady]);

  useEffect(() => {
    let api = `https://rickandmortyapi.com/api/character`;
    let box;
    let flag = 0
    let f = 0
    let i;
    const promise = new Promise((resolve, reject) => {
      let preData = [];
      fetch(api).then((res) => res.json()).then((data) => {
        data.results.map((resul) => {
          ++i
          ++flag
          if (flag == 4) {
            f++
            flag = 0
          }
          const boxMat = new BABYLON.StandardMaterial("boxMat");
          box = MeshBuilder.CreateBox("box" + i, { size: 1 }, scene);
          boxMat.diffuseTexture = new BABYLON.Texture(resul.image);
          box.material = boxMat;
          box.position.x = -6 + flag * 2;
          box.position.y = f * 2.5 - 4;
          box.position.z = 3;
          const charName = resul.name;
          box.isPickable = true;
          scene.onPointerDown = function (evt, pickResult) {
            if (pickResult.hit) {
              alert(JSON.stringify(
                {
                  name: resul.name,
                  id: resul.id,
                  resul
                }

              )
              );
            }
          };
          const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
            'textUI',
            undefined,
            scene
          );
          const uiText = new TextBlock('instructions');
          uiText.text = charName;
          uiText.color = '#f0ff00';
          uiText.fontFamily = 'Roboto';
          uiText.fontSize = 18;
          uiText.left = "200px";
          uiText.top = "200px" + `${i}px`;
          uiText.paddingBottom = '10px';
          advancedTexture.addControl(uiText);
          chracter = ([box, uiText]);
          characters.push(chracter);
        })
        preData.push(data.result)
        resolve(preData)
      });
    })

    setResult(promise)

  }, [])

  console.log("fff", characters, "data", data)

  useEffect(() => {
    if (filter !== undefined) {
      console.log("dataFilter", result, "filter", filter)
      setFilteredchars(
        result.filter((char) => {
          return char.name == filter
            .toLowerCase()
            .includes(filter.toLowerCase());
        })
      );
    }

  }, [filter]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilter(e.currentTarget.elements.usernameInput.value);
  }

  const charsToShow = filter ? filteredChar : characters;




  return (<>
    <canvas ref={reactCanvas} {...rest}  >
    </canvas>
    <div className="search-bar-div">
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="usernameInput"
            placeholder="search a character"
            value={filter}
          >Username:</label>
          <input id="usernameInput" type="text" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </>)
};







