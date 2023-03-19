import React, { useEffect, useState } from 'react';
import { useNet3Layers } from '../../../Context/Netlayers';

function ConfigureCable(props) {
    const net3layers = useNet3Layers();
    const cable_id = net3layers.select_tool.cable
    const cable_Type = net3layers.get_cable(cable_id).constructor.name
    if (!cable_id) return <></>
    const { connector1 , connector2} = net3layers.get_cable(cable_id)
    const dv1 = net3layers.get_device (connector1)
    const dv2 = net3layers.get_device (connector2)
    const device1 = dv1.Name
    const device2 = dv2 .Name
    const dv1_type = dv1.constructor.name
    const dv2_type = dv2.constructor.name 

    return (
        //Name 
        //N p Normal 
        //N p Cascade
        <div className='px-2 space-y-2 first:mt-7 last:mb-7'>
            <label for="nom" >{cable_Type} cable</label>
            <div> Connecting {device1} to {device2}</div>
            <SelectNewType current_type={cable_Type} dv1_type={dv1_type} dv2_type={dv2_type} />
            <div className='divider'></div>
            <div 
            onClick={()=>{
                net3layers.remove_cable(cable_id)
                net3layers.stage.fire("click")

            }}
            className='text-center p-2 text-lg font-bold bg-red-500 rounded-xl mt-5 mb-3 hover:bg-darknight transition duration-200 cursor-pointer '>
                Supprimer
            </div>
        </div>
    );
}

export default ConfigureCable;


function SelectNewType ({current_type , dv1_type , dv2_type})  {
    const s = dv1_type == dv2_type

    return (
        <select className="select w-full  bg-darknight">
            <option disabled selected>Pick Type</option>
            <option>Coxial</option>
            <option>Crossover</option>
            <option>Straight_through</option>
            <option>Telecom</option>
        </select>
    )
}