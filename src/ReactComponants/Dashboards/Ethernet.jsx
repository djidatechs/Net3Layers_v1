import React, { useEffect } from 'react';
import DashboardSection from './Builders/DashboardSection';
import ConfigureEthernetSimulation from './Builders/ConfigureEthernetSimulation';
import { useNet3Layers } from '../../Context/Netlayers';
import { Ethernet as Ethernet_model } from "../../Models/Ethernet/Ethernet";

function Ethernet(props) {
    const net3layers = useNet3Layers()

    const animationFrames = (frame)=>
        {
            const device_id = net3layers.select_tool.device
            const device = net3layers.get_device_reference(device_id)
            // device.setAttrs({x:device.x()+0.5})
            // console.log(device.x())
            // net3layers.setAnimation_controller({
            //     animate : new Ethernet_model ()
            // })
            //Do animation 
        }
    






    useEffect(() => {
        const layer = net3layers.stage.children[0]
        const animation = new window.Konva.Animation(frame => animationFrames(frame) , layer)
        
        animation.start() 
        return () => {animation.stop()}
    }, [])

    //make sure we are in ethernet simulation style 
    if (net3layers.layers != "Ethernet") {
        net3layers.layers == "Ethernet"
        //save the trouble of building the page
        return <></>
    }


    return (
        <div className='space-y-5 mx-4 my-3'>
            <DashboardSection name={"Simulation Setup"}><ConfigureEthernetSimulation/></DashboardSection>
        </div>
    );
}

export default Ethernet;