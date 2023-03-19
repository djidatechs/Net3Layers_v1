import React, { useEffect, useRef, useState } from 'react'
import { Arrow } from 'react-konva'
import { useNet3Layers } from '../../Context/Netlayers'

function Selector() {    
    const net3layers = useNet3Layers()
    const arrow_ref = useRef(null)
    const stage = net3layers.stage

    
    useEffect(() => {    
        if (arrow_ref.current) {
          stage.on('mousemove', (e) => {
            //fix 
            try{
              const pos = stage.getPointerPosition()
              if (pos) {
                const scale = net3layers.stage.scaleX()
                const x = pos.x /scale 
                const y = pos.y /scale
                //fix 
                arrow_ref.current.getLayer().batchDraw()
                arrow_ref.current.getAttrs().points = [net3layers.selector_xy.x, net3layers.selector_xy.y, x, y]
              }
            }
            catch{}
          })
        }
        return ()=>{
           try{stage.off("mousemove")} catch{}
        }
        
      }, [arrow_ref.current,net3layers.selector_xy.x,net3layers.selector_xy.y])

      if (!net3layers.selector_xy.x || !net3layers.selector_xy.y)
        return <></>
    return (
        <Arrow
        id='Selector_Arrow'
        ref={arrow_ref}
        tension={0.3}
        points={[net3layers.selector_xy.x,net3layers.selector_xy.y,undefined,undefined]}
        stroke={"pink"}
        fill={"pink"}
        strokeWidth={4}
        pointerWidth={0}
        />
    )
}

export default Selector