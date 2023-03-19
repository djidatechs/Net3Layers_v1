import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Zoom from './Zoom';
import { useNet3Layers } from '../../Context/Netlayers';
import Devices from './Devices';
import Contextual from './Contextual';
import { CONTEXTUAL_STYLES_INIT } from '../../Shared/constants';
import Selector from './Selector';
import Cables from './Cables';
import Animator from './Animator';
import { reset_selection } from '../../Shared/functions';

// GENERAL RULES 
// Emulation Priority : 
// 1 - if You can do it with any present reference , do it 
// 2 - if you can't , use the net3layers.stage reference and filter 
// 3- if you can't use state variables
// Emulation methode : 
// 1- if you can do it with attrs ,do it  
// 2- if you can't , use event listenners 
// 3- if you can't , use state variables + Effects 

const Emulator = () => {
  const {scaler } = useNet3Layers()
  // const {setScaler } = useNet3Layers()
  const net3layers = useNet3Layers()
  const stage_ref = useRef(null)
  useEffect(()=>{
    if (stage_ref.current) net3layers.setStage(stage_ref.current)
  },[ stage_ref.current])


  return (
    net3layers.synchronize && (
    <div id="Emulator" className="w-3/4 bg-midnight overflow-auto scrollbar scrollbar-thumb-night scrollbar-track-midnight"
      style={{ height: 'calc(100vh - 46px)' , position:"relative" }} // adjust height to account for top and bottom navbars
    >
      {/* <Zoom setScale={setScaler}/> */}
      <Contextual/>
      <Animator>
      <Stage  ref={stage_ref} width={2500*scaler.x} height={2500*scaler.y} scale={scaler} //draggable 
      onClick={
        (e)=>{
          stage_ref.current.off('mousemove')
          net3layers.setSelector_xy({x:undefined,y:undefined})
          net3layers.setContextual({id:null,styles:CONTEXTUAL_STYLES_INIT})
          net3layers.setSelect_tool(reset_selection())
        }
        } >
          
        <Layer>
          <Selector />
          <Cables />
          <Devices/>
        </Layer>
      </Stage>
      </Animator>
    </div>
    )
  );
};
export default Emulator ;  
// import { useState, useEffect } from 'react';
// import { Circle, Layer, Rect, Stage } from 'react-konva';

// function Emulator() {
//   const [x, setX] = useState(50);
//   const [y, setY] = useState(50);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setX(x => x + 5);
//       setY(y => y + 5);
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Stage width={500} height={500}>
//       <Layer>
//         <Rect x={x} y={y} width={100} height={100} fill="red" />
//         <Circle x={250} y={250} radius={50} fill="blue" />
//       </Layer>
//     </Stage>
//   );
// }
//  export default Emulator ; 