import {useContext, createContext, useState, useEffect } from "react";
import { device_creator, device_remover } from "./functions/device";
import { cable_creator, cable_remover } from "./functions/cable";
import { Ethernet } from "../Models/Ethernet/Ethernet";
import { IP } from "../Models/IP/IP";
import { Transport } from "../Models/Transport/Transport";
import { CONTEXTUAL_STYLES_INIT, LAYERS_INIT } from "../Shared/constants";

export const Net3Layers = createContext()
export default function Net3LayersContextProvider ({children}){
    const [layers , setLayers] = useState("Conception")
    const [devices , setDevices ] = useState([])
    const [cables , setCables ] = useState([])
    const [contextual,setContextual] = useState({ id : null , styles :CONTEXTUAL_STYLES_INIT})
    const [scaler , setScaler] = useState({x:1,y:1})
    const [select_tool , setSelect_tool] = useState({
        port : null,    
        port_type : null,
        device:null,
        cable : null,
    })
    const [synchronize , setSynchronize ] = useState(1)
    const [synchronize_dash , setSynchronize_dash ] = useState(1)
    const [selector_xy , setSelector_xy] = useState({x:undefined, y:undefined})
    const [stage , setStage] = useState(null)
    const [animation_controller , setAnimation_controller] = useState({
        animate : {} , 
        data  : {} , 
        
    })
    
    

    // useEffect(()=>{
    //     setLayers(current=>{
    //         current.ethernet = new Ethernet ()
    //         current.ip = new IP ()
    //         current.transport = new Transport ()

    //         return current
    //     })
    // },[])
    let ntl = new Net3LayersContextClass (devices,setDevices,cables,setCables,contextual,setContextual,select_tool,setSelect_tool, layers, setLayers,scaler , setScaler,synchronize , setSynchronize,selector_xy , setSelector_xy,stage , setStage,synchronize_dash , setSynchronize_dash,animation_controller , setAnimation_controller)
    return (
        <Net3Layers.Provider value={ntl}>
            <div className="">
            {children}
            </div>
        </Net3Layers.Provider>
    )
}
export const useNet3Layers = () => {
    const Net3LayersClient = useContext(Net3Layers)
    return Net3LayersClient
}

class Net3LayersContextClass {
    constructor(devices, setDevices, cables, setCables, contextual, setContextual, select_tool, setSelect_tool, layers, setLayers,scaler , setScaler,synchronize , setSynchronize,selector_xy , setSelector_xy,stage , setStage,synchronize_dash , setSynchronize_dash,animation_controller , setAnimation_controller){
        this.devices = devices
        this.setDevices = setDevices
        this.cables = cables
        this.setCables = setCables
        this.contextual = contextual
        this.setContextual = setContextual
        this.select_tool = select_tool
        this.setSelect_tool = setSelect_tool
        this.scaler = scaler
        this.setScaler = setScaler
        this.synchronize = synchronize
        this.setSynchronize = setSynchronize
        this.selector_xy = selector_xy
        this.setSelector_xy = setSelector_xy
        this.stage = stage
        this.setStage = setStage
        this.layers = layers 
        this.setLayers = setLayers
        this.synchronize_dash =synchronize_dash
        this.setSynchronize_dash = setSynchronize_dash
        this.animation_controller = animation_controller
        this.setAnimation_controller = setAnimation_controller
    }

    get_device(id){ return this.devices.filter( device=> device.id == id )[0] }

    get_cable(id){ return this.cables.filter( cable=> cable.id == id )[0] }

    add_device(device , ...props) { this.devices.push( device_creator (device , ...props) ) }
    
    add_cable(  ...props) { 
        this.cables.push( cable_creator ( this , ...props) )
     }

    remove_device(id) { device_remover(this,id) }

    remove_cable(id) { cable_remover(this,id) }

    get_layer(layer) { return this.layers[layer]}

    synchronize_now(){this.setSynchronize(e=>e+1)}
    synchronize_dash_now(){this.setSynchronize_dash(e=>e+1)}
    

    get_device_reference (device_id){
        return this.stage.children[0].children.filter(group=>group.attrs.id == device_id)[0]
    }



}

