import React, { useEffect, useRef, useState } from 'react';
import { Arrow } from 'react-konva';
import { useNet3Layers } from '../../Context/Netlayers';
import { reset_selection } from '../../Shared/functions';

function Edge({color , id}) {
    const net3layers = useNet3Layers()
    const scale = net3layers.stage.scaleX()
    const EdgeREf = useRef(null)
    const [points , setPoints] = useState([undefined,undefined,undefined,undefined])
    const device_1_id = net3layers.cables.filter(cable=>cable.id == id)[0].connector1
    const device_2_id = net3layers.cables.filter(cable=>cable.id == id)[0].connector2
    const device_1_ref =  net3layers.get_device_reference(device_1_id)
    const device_2_ref =  net3layers.get_device_reference(device_2_id)
    const client_1 = device_1_ref.getClientRect();
    const client_2 = device_2_ref.getClientRect();
    const centerX1 = ((client_1.x ) + (client_1.width  / 2))/scale
    const centerY1 = ((client_1.y ) + (client_1.height  / 2))/scale
    const centerX2 = ((client_2.x ) + (client_2.width  / 2))/scale
    const centerY2 = ((client_2.y ) + (client_2.height  / 2))/scale 

    const Device_1_dragmove_listnner = ()=>{
        const scale = net3layers.stage.scaleX()    
        const client_1 = device_1_ref.getClientRect()        
        const centerX1 = ((client_1.x ) + (client_1.width  / 2))/scale
        const centerY1 = ((client_1.y ) + (client_1.height  / 2))/scale
        console.log({scale})
        EdgeREf.current.getAttrs().points[0] = centerX1
        EdgeREf.current.getAttrs().points[1] = centerY1
    }
    const Device_2_dragmove_listnner =()=>{   
        const scale = net3layers.stage.scaleX()     
        const client_2 = device_2_ref.getClientRect()        
        const centerX2 = ((client_2.x ) + (client_2.width  / 2))/scale
        const centerY2 = ((client_2.y ) + (client_2.height  / 2))/scale
        EdgeREf.current.getAttrs().points[2] = centerX2
        EdgeREf.current.getAttrs().points[3] = centerY2
    }

    useEffect(()=>{
        device_1_ref.on("dragmove" , Device_1_dragmove_listnner )
        device_2_ref.on("dragmove" , Device_2_dragmove_listnner)

        return ()=>{
            device_1_ref.off("dragmove",Device_1_dragmove_listnner)
            device_2_ref.off("dragmove",Device_2_dragmove_listnner)
        }
    },[])
  

    useEffect(()=>{        
        setPoints([centerX1,centerY1,centerX2,centerY2])
        

    },[centerX1,centerY1,centerX2,centerY2])

    

    

    return (
        <Arrow
        
        ref={EdgeREf}
        tension={0.3}
        points={points}
        stroke={color}
        fill={color}
        strokeWidth={4}
        pointerWidth={0}
        onClick={(e)=>{
            e.cancelBubble=true
            net3layers.setSelect_tool({...reset_selection(),cable:id})
            
        }}
        onContextMenu={e=>e.cancelBubble=true}
        onMouseEnter={(e)=>{e.target.setAttr("strokeWidth",14);e.target.getStage().container().style.cursor = 'pointer'}}
        onMouseLeave={(e)=>{e.target.setAttr("strokeWidth",4);e.target.getStage().container().style.cursor = 'default' }}
        
        />
    );
}

export default Edge;