import React, { useEffect, useState } from 'react';
import { useNet3Layers } from '../../../Context/Netlayers';
import PortControl from './PortBuilders/SectionsHolder';

function ConfigureDevice(props) {
    const net3layers = useNet3Layers();
    const device_id = net3layers.select_tool.device
    const Device_Type = net3layers.devices.filter(device=>device.id== device_id)[0].constructor.name
    if (!device_id) return <></>
    const {Name} = net3layers.devices.filter(device=>device.id== device_id)[0]
    const [name , setName ] = useState(Name)

    useEffect(()=>{
        setName(Name)
        
    },[net3layers.select_tool.device])

    const NameChangeHandler = (e) =>{
        
        net3layers.devices.filter(device=>device.id== device_id)[0].Name = e.target.value
        setName(e.target.value)
    }

    return (
        //Name 
        //N p Normal 
        //N p Cascade
        <div className='px-2 space-y-2 first:mt-7 last:mb-7'>
            <label for="nom" >{Device_Type}</label>
            <input name='nom' type="text" placeholder="Type here" className="input  bg-darknight text-light w-full " onChange={(e)=>NameChangeHandler(e)} value={name}/>
            <p className='text-xs text-light'>Cliquer sur le stage pour affirmer le changement</p>
            <PortControl/>
            <div className='divider'></div>
            <div 
            onClick={()=>{
            net3layers.remove_device(device_id)
            net3layers.stage.fire("click")
            }}
            className='text-center p-2 text-lg font-bold bg-red-500 rounded-xl mt-5 mb-3 hover:bg-darknight transition duration-200 cursor-pointer '>
                Supprimer
            </div>
        </div>
    );
}

export default ConfigureDevice;