

import React, { useState } from 'react';
import Port from './Port';
import { useNet3Layers } from '../../../../Context/Netlayers';
// Section : collection of ports based on device id 
export default function PortSection ({list,text,device_id,type }){
    if (!list.length) return <></>
    return (
        
        <>
        <div className='w-full pl-1 cursor-pointer text-center'>{text}</div> 
        { list.map((port,index)=><Port port={port} device_id={device_id} index={index+1} type={type} />)}
        {/* <Port port={port} device_id={device_id} index={index+1} type={type} /> */}
        <AddPort type={type} />
        </>
        
    )
}

function AddPort({type}) {
    const net3layers = useNet3Layers()
    const AjouterPort = ()=>{
        const device_id = net3layers.select_tool.device
        let device = net3layers.get_device(device_id)

        switch (type) {
            case 'Normal':
                device.normal_ports_list.push({to_device : undefined , to_port : undefined})
                return console.log("clicked and performed according to type : " , type )
            case 'Cascade':
                device.cascade_ports_list.push({to_device : undefined , to_port : undefined})
                return console.log("clicked and performed according to type : " , type )
            case 'nic':
                device.nic_list.push({to_device : undefined , to_port : undefined})
                return console.log("clicked and performed according to type : " , type )
        }

    }


    return (
        <div className='group w-full text-sm pl-1 cursor-pointer hover:bg-darknight hover:text-light transition duration-300'
        onClick={()=>{
            AjouterPort(type)
            net3layers.synchronize_dash_now()
        }}
        >
            <div className='inline ml-3'>Ajouter un {type} port</div>
        </div>
    )

}