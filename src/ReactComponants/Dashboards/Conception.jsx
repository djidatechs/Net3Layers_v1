import React from 'react';
import { useNet3Layers } from '../../Context/Netlayers';
import DashboardSection from './Builders/DashboardSection';

import AddDeviceContent from './Builders/AddDeviceContent';
import ConfigureDevice from './Builders/ConfigureDevice';
import ConfigureCable from './Builders/ConfigureCable';

function Conception(props) {
    const net3layers = useNet3Layers()
    const device_id = net3layers.select_tool.device
    const cable_id = net3layers.select_tool.cable
   
    return (
    <div className='space-y-5 mx-4 my-3'>
        <DashboardSection name={"Ajouter un equipement"}> <AddDeviceContent/></DashboardSection>
        {device_id ? <DashboardSection name={"Configuration de device"}> <ConfigureDevice/>    </DashboardSection>: <></>}
        {cable_id ? <DashboardSection name={"Configuration de cable"}> <ConfigureCable/>    </DashboardSection>: <></>}

    </div>
    // <div className='grid grid-cols-4 h-[50%]'>
    //     <button onClick={add_switch}>add switch</button>
    //     <button onClick={add_hub}>add hub</button>
    //     <button onClick={add_internet}>add internet</button>
    //     <button onClick={add_station}>add station</button>
    //     <button onClick={console_stage}>console stage</button>
    //     <button onClick={console_xy}>console x,y</button>
    //     <button onClick={console_net3layers}>net3layers</button>

    // </div>
    );
} 

export default Conception;



