import React, { useEffect, useState } from 'react';
import { useNet3Layers } from '../../../../Context/Netlayers';

export default function Port ({index,device_id, type}){
    const net3layers = useNet3Layers()   
    const [connection , setConeection] = useState(false)
    const [conn_dev_name ,set_conn_dev_name ] = useState(null)


    useEffect(()=>{
        const {connection , device_name } = get_connection_with_device(net3layers,index,type,device_id) 
        setConeection(connection)
        if (device_name) set_conn_dev_name(device_name)
    },[net3layers.select_tool.device])


    return (
        <div
        className='group w-full pl-1 cursor-pointer hover:bg-evening hover:text-light transition duration-300'>
           {
            connection // ? green : orange
            ? <div className='inline-block w-[10px] h-[10px] bg-green-500 rounded-full'></div>
            : <div className='inline-block w-[10px] h-[10px] bg-orange-500 rounded-full'></div>}
            <div className='inline ml-3'>Port {index} 
                {
                conn_dev_name &&
                <span className='text-sm ml-2 text-semibold text-morning'>
                    {conn_dev_name}
                </span>
                }
            </div>
        </div>
    )
}

function get_connection_with_device (netcopy, index , type , device_id) {
    //get cable connection with device (device_id)
    let cables1 = netcopy.cables.filter(cable=>cable.connector1 == device_id) 
    let cables2 = netcopy.cables.filter(cable=>cable.connector2 == device_id) 
    console.log(cables1.length)
    
    
    //
    let inx_1 = 0 
    let checker_1 = false
    cables1.map((cable,ind)=>{if (cable.port1 == index && cable.port1_type == type){inx_1 = ind ; checker_1 = true }})
    if (checker_1 ) return {connection: true , device_name : netcopy.get_device(cables1[inx_1]?.connector2)?.Name}

    let inx_2 = 0 
    let checker_2 = false
    cables2.map((cable,ind)=>{if (cable.port2 == index && cable.port2_type == type){inx_2 = ind ; checker_2 = true }})
    if (checker_2 ) return {connection: true , device_name : netcopy.get_device(cables2[inx_2]?.connector1)?.Name}


    return {connection: false , device_name : undefined }
}