import React from 'react';
import { useNet3Layers } from '../../Context/Netlayers';
import Hub from '../../KonvaUi/Devices/Hub';
import Switch from '../../KonvaUi/Devices/Switch';
import Station from '../../KonvaUi/Devices/Station';
import InternetRouter from '../../KonvaUi/Devices/InternetRouter';

function Devices(props) {
    const net3layers = useNet3Layers()
    

    if (!net3layers.devices.length)
        return <></>
    
    return (
       <>
       {net3layers.devices.map(device=>{
            const id = device.id
           switch (device.constructor.name) {
            case 'Hub':
                return  <Hub id={id} key={id} text={device.Name || ""}/>
            case 'Switch':
                return  <Switch id={id} key={id} text={device.Name || ""}/>
            case 'Station':
                return  <Station id={id} key={id} text={device.Name || ""}/>
            case 'InternetRouter':
                return  <InternetRouter id={id} key={id} text={device.Name || ""}/>
              default:
                throw new Error('Invalid device type');
            }
       })}
       </>

    );
}

export default Devices;