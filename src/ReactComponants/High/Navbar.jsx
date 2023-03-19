
import React, { useEffect, useState } from 'react';
import { useNet3Layers } from '../../Context/Netlayers';
import zoomIn from "../../assets/zoom+.svg"
import zoomOut from "../../assets/zoom-.svg"
const NavBar = () => {
    const {setScaler} = useNet3Layers()
    const n = useNet3Layers()
    const handleClick = ()=>{
        console.log(n)
    }

    const In = () => {
        setScaler(current=>({
            x : current.x+0.1 > 1.3 ? 1.3 : current.x+0.1,
            y : current.y+0.1 > 1.3 ? 1.3 : current.y+0.1
        }))
    }
    const Out = () => {
        setScaler(current=>({
            x : current.x-0.1 < 0.5 ? 0.5 : current.x-0.1,
            y : current.y-0.1 < 0.5 ? 0.5 : current.y-0.1
        }))
    }

    return (
        <div className="w-full mx-auto bg-night text-white py-2 px-4 space-x-4 border-b-2" id='navbar'  >
            <span className='font-extrabold text-lg mr-10' onClick={handleClick}>Net 3 Layers</span>
            <span className=' space-x-5 text-lg font-semibold text-white p-3'>
                <NavElement layer={"Conception"} /> 
                <NavElement layer={"Ethernet"} />
                <NavElement layer={"Internet"} />
                <NavElement layer={"Transport"} />
            </span>
            <span className='float-right'>
                <img src={  zoomIn  } onClick={In}  className='w-5 h-5 inline mr-5 cursor-pointer hover:scale-125' alt=''/>
                <img src={  zoomOut } onClick={Out} className='w-5 h-5 inline mr-5 cursor-pointer hover:scale-125' alt=''/>
            </span>


        </div>
    )
};

export default NavBar ;


const NavElement = ({layer})=>{
    
    const net3layers = useNet3Layers()
    const [Active , setActive] = useState(false)
    useEffect(()=>{
        const active = net3layers.layers == layer
        setActive(active)
    },[net3layers.layers])
    
    return (
    <span
        onClick={()=>{net3layers.setLayers(layer);console.log(Active)}}    
        className={"cursor-pointer " + (Active ? "text-morning " : "")}>
            {layer}
    </span>
    )
    
}


