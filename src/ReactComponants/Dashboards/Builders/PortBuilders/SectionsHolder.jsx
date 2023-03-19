import React from 'react';
import { useNet3Layers } from '../../../../Context/Netlayers';
import { HubPortControl, InternetRouterPortControl, StationPortControl, SwitchPortControl } from './DevicesSections';

function PortControl_helper(props) {
     const net3layers = useNet3Layers()
    const device_id = net3layers.select_tool.device
    if (!device_id) return <></>
    const Device = net3layers.devices.filter(device=>device.id== device_id)[0]
    
    switch (Device.constructor.name) {
        case 'Hub':
            return  <HubPortControl Hub={Device} /> 
        case 'Switch':
            return  <SwitchPortControl Switch={Device} /> 
        case 'Station':
            return  <StationPortControl Station={Device}/> 
        case 'InternetRouter':
            return  <InternetRouterPortControl InternetRouter={Device}/> 
          default:
            throw new Error('Invalid device type');
        }
}




function PortControl({children}) {
    const {synchronize_dash} = useNet3Layers()
    return (
        <>
        {synchronize_dash ? <PortControl_helper/>: <>Err</>}
        </>
    )
}
export default PortControl;