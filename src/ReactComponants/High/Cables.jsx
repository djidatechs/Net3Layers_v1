import React, { useEffect } from 'react';
import { useNet3Layers } from '../../Context/Netlayers';
import Coxial from '../../KonvaUi/Cables/Coxial';
import Crossover from '../../KonvaUi/Cables/Crossover';
import Straight_through from '../../KonvaUi/Cables/Straight_through';
import Telecom from '../../KonvaUi/Cables/Telecom';

function Cables(props) {
    const net3layers = useNet3Layers()
    useEffect(()=>{
        console.log("cable is being created")
    },[net3layers.cables])
    

    if (!net3layers.cables.length)
        return <></>
    
    return (
       <>
       {net3layers.cables.map(cable=>{
            const id = cable.id
           switch (cable.constructor.name) {
            case 'Coxial':
                return  <Coxial id={id} key={id} text={cable.Name || ""}/>
            case 'Crossover':
                return  <Crossover id={id} key={id} text={cable.Name || ""}/>
            case 'Straight_through':
                return  <Straight_through id={id} key={id} text={cable.Name || ""}/>
            case 'Telecom':
                return  <Telecom id={id} key={id} text={cable.Name || ""}/>
            default:
                throw new Error('Invalid cable type');
            }
       })}
       </>

    );
}

export default Cables;