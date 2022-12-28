// import {
//     Mesh,
//     MultiMaterial,
//     StandardMaterial,
//     SubMesh,
//     Color3,
//     Vector3
//   } from "@babylonjs/core";
//   import { useRef, useEffect } from "react";
//   //import imagem from "./core/assets/images/Toronto_490x360.jpg";
  
//   type Props = {
//     largura: number;
//     altura: number;
//     profundidade: number;
//   };
  
//   // adapted from https://playground.babylonjs.com/#T40FK
//   const MyMesh = ({ largura, altura, profundidade }: Props) => {
//     const material0 = useRef<StandardMaterial | null>(null);
//     const material1 = useRef<StandardMaterial | null>(null);
//     const material2 = useRef<StandardMaterial | null>(null);
//     const material3 = useRef<StandardMaterial | null>(null);
//     const material4 = useRef<StandardMaterial | null>(null);
//     const material5 = useRef<StandardMaterial | null>(null);
  
//     const box = useRef<Mesh | null>(null);
//     const multi = useRef<MultiMaterial | null>(null);
  
//     useEffect(() => {
//       if (multi.current === null || box.current === null) {
//         return;
//       }
  
//       multi.current.subMaterials.push(material0.current);
//       multi.current.subMaterials.push(material1.current);
//       multi.current.subMaterials.push(material2.current);
//       multi.current.subMaterials.push(material3.current);
//       multi.current.subMaterials.push(material4.current);
//       multi.current.subMaterials.push(material5.current);
//       //apply material
//       box.current.subMeshes = [];
//       var verticesCount = box.current.getTotalVertices();
//       box.current.subMeshes.push(
//         new SubMesh(0, 0, verticesCount, 0, 6, box.current!)
//       );
//       box.current.subMeshes.push(
//         new SubMesh(1, 1, verticesCount, 6, 6, box.current!)
//       );
//       box.current.subMeshes.push(
//         new SubMesh(2, 2, verticesCount, 12, 6, box.current!)
//       );
//       box.current.subMeshes.push(
//         new SubMesh(3, 3, verticesCount, 18, 6, box.current!)
//       );
//       box.current.subMeshes.push(
//         new SubMesh(4, 4, verticesCount, 24, 6, box.current!)
//       );
//       box.current.subMeshes.push(
//         new SubMesh(5, 5, verticesCount, 30, 6, box.current!)
//       );
//       // already one box.material=multi;
//     }, [box, multi]);
  
//     return (
//       <>
//         <standardMaterial
//           name="material0"
//           ref={material0}
//           diffuseColor={new Color3(0.75, 0, 0)}
//         />
//         <standardMaterial
//           name="material1"
//           ref={material1}
//           diffuseColor={new Color3(0, 0, 0.75)}
//         />
//         <standardMaterial
//           name="material2"
//           ref={material2}
//           diffuseColor={new Color3(0, 0.75, 0.75)}
//         />
//         <standardMaterial
//           name="material3"
//           ref={material3}
//           diffuseColor={new Color3(0, 0, 0.75)}
//         />
//         <standardMaterial
//           name="material4"
//           ref={material4}
//           diffuseColor={new Color3(0, 0.75, 0)}
//         />
//         <standardMaterial
//           name="material5"
//           ref={material5}
//           diffuseColor={new Color3(1, 1, 0)}
//         />
  
//         <box
//           name="boxMulti"
//           ref={box}
//           width={80}
//           height={100}
//           depth={30}
//           scaling={new Vector3(largura / 80, altura / 100, profundidade / 30)}
//           position={new Vector3(0, altura / 2, 0)}
//         >
//           <multiMaterial name="nuggetman" ref={multi} />
//         </box>
//       </>
//     );
//   };
  
//   export default MyMesh;