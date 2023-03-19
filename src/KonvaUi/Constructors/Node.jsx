import React, { useEffect, useRef, useState } from 'react';
import { Circle, Group, Rect, Text } from 'react-konva';
import { useNet3Layers } from '../../Context/Netlayers';

function Node({Image , text ,id }) {
    const [imageElement, setImageElement] = useState(null);
    const [size , setSize] = useState({h:100,w:100})
    const RectRef = useRef(0)
    const  {scaler} = useNet3Layers()
    const net3layers = useNet3Layers()
    const [draggable , setDraggable] = useState(true)

    //Get image
    useEffect(() => {
      const img = new window.Image();
      img.src = Image;
      img.onload = () =>{ setImageElement(img);setSize({w:img.width,h:img.height})}
    }, [Image]);
    useEffect(()=>{
      net3layers.update_STP();
    },[])

    //Decide draggability : based on if the selector arrow is active 
    useEffect(()=>{
      if (net3layers.selector_xy.x)
        setDraggable(false)
      else setDraggable(true)
    },[net3layers.selector_xy.x,net3layers.selector_xy.y])
    
    //Dragging boundries
    const dragBoundFunc = (pos) => {
        const { x, y } = pos;
        const nodeWidth = RectRef.current.width();
        const nodeHeight = RectRef.current.height();
    
        // Keep the node within the left and right edges of the stage
        let newX = x;
        if (x < 0) {
          newX = 0;
        } else if (x + nodeWidth > ((2500-100)*scaler.x  )) {
          newX = ((2500-100)*scaler.x  ) - nodeWidth;
        }
    
        // Keep the node within the top and bottom edges of the stage
        let newY = y;
        if (y < 0) {
          newY = 0;
        } else if (y + nodeHeight > ((2500-100)*scaler.y )) {
          newY = ((2500-100)*scaler.y ) - nodeHeight;
        }
    
        return { x: newX, y: newY };
      };
  
    return (
        <Group
        key={'g'+id}
        draggable={draggable}
        dragBoundFunc={dragBoundFunc}
        id={id}
        onclick={(e)=>{e.cancelBubble=true}}
        onContextMenu={(e)=>{e.cancelBubble=true}}
        
        >
        <Rect
            key={'device'+id}
            id={'device'+id}
            x={100}
            y={100}
            width={size.w}
            height={size.h}
            ref={RectRef}
            fillPatternImage={imageElement} 
            fillPatternScaler={{ x: 0.6, y: 0.6 }} 
            fillPatternRepeat='no-repeat'
            onMouseEnter={(e)=>{ e.target.getStage().container().style.cursor = net3layers.selector_xy.x ? "pointer" : "grab"  }}
            onMouseLeave={(e)=>{e.target.getStage().container().style.cursor = 'default' }}
            //device 1 
            onContextMenu={(e)=>{
              
              e.evt.preventDefault()
              // console.log("my id "+id)
              if (net3layers.selector_xy.x) return 
              const {x,y} = e.target.getAbsolutePosition()
              net3layers.setContextual(show_context_style(id,x,y))
              net3layers.setSelect_tool (current=>{current.device = id ; current.cable = null; return current })
            }}  
            //device 2
            onClick={(e)=>{
              if (e.evt.button !== 0) return //click is not left click
              if (net3layers.selector_xy.x == undefined){
                net3layers.setSelect_tool (current=>{current.device = id ; current.cable = null; return current })
                net3layers.synchronize_now()
                
                return 
              }
              const {x,y} = e.target.getAbsolutePosition()
              net3layers.setContextual(show_context_style(id,x,y))
              // net3layers.setSelect_tool (current=>{current.device2 = id; return current })

            }}
        />
            
        <Text
        key={'t'+id}
        x={100+size.w/2.5}  
        y={100+size.h}
        fontSize={30}
        fontStyle={"semibold"}
        text={text}
        fill='white'
        align="center"

    />
            
        </Group> 
    );
}

export default Node;




const show_context_style =(id,x,y)=> ({
  id:id,
  styles:{
    position:"absolute",
    display:"block",
    top:  y,
    left: x-150,
  }
})
