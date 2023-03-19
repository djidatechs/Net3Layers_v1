import React, { useEffect, useState } from 'react';
import { useNet3Layers } from '../../Context/Netlayers';
import { CONTEXTUAL_STYLES_INIT } from '../../Shared/constants';
import { reset_selection } from '../../Shared/functions';
// import { Crossover } from '../../Models/Cable/Crossover';

function Contextual(props) {
    const net3layers = useNet3Layers()
    return (
        
        <div className='bg-light transition rounded-sm py-1 z-[99] w-44 text-night overflow-visible' style={net3layers.contextual.styles}>
            <DeviceContextual/>  
        </div>
    );
}
export default Contextual;



// <------------------ dynamic assetions area ------------------>
//port : magic happens here 
//HERE FIX 
//
function Port ({index,device_id, type}){
    const net3layers = useNet3Layers()   
    const [connection , setConeection] = useState(false)
    const [conn_dev_name ,set_conn_dev_name ] = useState(null)


    useEffect(()=>{
        const {connection , device_name } = get_connection_with_device(net3layers,index,type,device_id) 
        setConeection(connection)
        if (device_name) set_conn_dev_name(device_name)
    },[net3layers.contextual.id])


    return (
        <div
        onClick={()=>{
            if (connection) return console.log("connected with",device_name)

            if (net3layers.select_tool.device && net3layers.select_tool.port ) {
                //set
                net3layers.add_cable (  net3layers.select_tool.device ,device_id , net3layers.select_tool.port , index , net3layers.select_tool.port_type , type )
                net3layers.setSelector_xy({x:null,y:null})
                net3layers.setSelect_tool(reset_selection())
                net3layers.setContextual({id:null,styles:CONTEXTUAL_STYLES_INIT})
                net3layers.synchronize_now()
            }

            else if (net3layers.select_tool.device && !net3layers.select_tool.port ) {
                //get
                const device_reference =  net3layers.get_device_reference(device_id)
                const scale = net3layers.stage.scaleX()
                const {centerX,centerY} = getCenteredClientXY (device_reference,scale) 
                //set
                net3layers.setSelector_xy({x:centerX,y:centerY})
                net3layers.setSelect_tool(x=>{x.device=device_id ; x.port=index ; x.port_type=type ; return x})
                net3layers.setContextual(x=>{x.styles=CONTEXTUAL_STYLES_INIT ; return x})
                
            }      
        }}
        //...<div
        className='group w-full pl-1 cursor-pointer hover:bg-evening hover:text-light transition duration-300'>
           {
            connection // ? green : orange
            ? <div className='inline-block w-[10px] h-[10px] bg-green-500 rounded-full'></div>
            : <div className='inline-block w-[10px] h-[10px] bg-orange-500 rounded-full'></div>}
            <div className='inline ml-3'>Port {index} 
            {conn_dev_name &&<span className='text-sm ml-2 text-semibold text-evening'>
                {conn_dev_name}
            </span>}
             </div>
        </div>
    )
}


// Section : collection of ports based on device id 
function Section ({list,text,device_id,type}){
    if (!list.length) return <></>
    return (
        <>
        <div className='w-full pl-1 cursor-pointer text-center'>{text}</div> 
        {list.map((port,index)=><Port port={port} device_id={device_id} index={index+1} type={type} />)}
        </>
    )
}

// <------------------ Contextual menues area ------------------>
function DeviceContextual () {
    const net3layers = useNet3Layers ()
    const device_id = net3layers.contextual.id
    if (!device_id) return <></>
    const Device = net3layers.devices.filter(device=>device.id== device_id)[0]

    
    switch (Device.constructor.name) {
        case 'Hub':
            return  <HubContextual Hub={Device} />
        case 'Switch':
            return  <SwitchContextual Switch={Device} />
        case 'Station':
            return  <StationContextual Station={Device}/>
        case 'InternetRouter':
            return  <InternetRouterContextual InternetRouter={Device}/>
          default:
            throw new Error('Invalid device type');
        }


}

function SwitchContextual ({Switch}){
    return (
        <>
            <Section device_id={Switch.id} list={Switch.normal_ports_list} type={"Normal"}  text={"Normal ports"} />
            <Section device_id={Switch.id} list={Switch.cascade_ports_list} type={"Cascade"}  text={"Cascade ports"} />
            <Section device_id={Switch.id} list={Switch.q802n1_ports_list} type={"802.1q"}  text={"802.1q ports"} />
        </>
    )
}
function HubContextual ({Hub}){
    return (
        <>
        <Section device_id={Hub.id} list={Hub.normal_ports_list}  type={"Normal"} text={"Normal ports"} />
        <Section device_id={Hub.id} list={Hub.cascade_ports_list}  type={"Cascade"} text={"Cascade ports"} />
        </>
    )
}
function StationContextual ({Station}){
    return <Section device_id={Station.id} list={Station.nic_list} type={"nic"} text={"NICs"}/>
}
function InternetRouterContextual ({InternetRouter}) {
    return <Section device_id={InternetRouter.id} list={InternetRouter.nic_list} type={"nic"} text={"NICs"} />
}

const getCenteredClientXY=(device_reference,scale)=>{
    const {x, y, width, height} = device_reference.getClientRect()
    const centerX = ( x + (width  / 2)  ) /scale
    const centerY = ( y + (height / 2)  ) /scale
    return {centerX,centerY}
}

function get_connection_with_device (netcopy, index , type , device_id) {
    //get cable connection with device (device_id)
    let cables1 = netcopy.cables.filter(cable=>cable.connector1 == device_id) 
    let cables2 = netcopy.cables.filter(cable=>cable.connector2 == device_id) 
    
    
    
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