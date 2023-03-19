import React, { useEffect, useState } from 'react';
import { BinaryRadio } from './ConfigureEthernetSimulation';
import { useNet3Layers } from '../../../Context/Netlayers';

function Trames(props) {
    const {animation_controller , setAnimation_controller} = useNet3Layers()
    const ntl = useNet3Layers() 

    const add_trame = () => { 
        setAnimation_controller(current => {
            const newTrames = current?.data?.trames?.length
                ? [...current.data.trames, {}]
                : [{}];
            return {
                ...current,
                data: {
                    ...current.data,
                    trames: newTrames,
                },
            };
        });
    };
    
    useEffect(()=>{
        
        if (! animation_controller.data.trames?.length)  {
            add_trame()
            
        }
    },[])

    if (!animation_controller.data.trames?.length) return <></>
    return (
        <>
        <div className="text-center my-2 ">Frames Settings</div>   
            <div className='space-y-10'>
                <div>
                    {
                        animation_controller.data.trames.map((trame,index)=><Trame id={index+1} /> )
                    }
                    <div className='mt-3 text-center cursor-pointer' onClick={add_trame}>Ajouter Trame</div>
                    
                </div>
            </div>
        </>
        
    );
}

export default Trames;



const Trame = ({id,setFocus,})=> {
    const ntl = useNet3Layers()

    return (
        <div className='border-2 mx-4 p-2 space-y-3 pb-6 my-3 first:mt-0'>
            <div className='text-center font-semibold'>Trame {id}</div>
            <BinaryRadio FirstChoice={"Brodcast"} SecondChoice={"Unicast"} radio={id} inline/>
            <div className=''>
                <label className='mt-10'>Longeur de trame</label>
                <select className="select border-[1px] border-white  bg-night w-full">
                    <option>Court</option>
                    <option selected>Moyenne</option>
                    <option>Long</option>
                </select>

                <label className='mt-10'>Source</label>

                <select className="select border-[1px] border-white  bg-night w-full">
                    {
                        ntl.devices.map(device=>{
                            let selected = -1
                            if (device.constructor.name == "Station")
                                return <option selected={!!(++selected)}>{device.Name}</option>
                        })
                    }
                </select>

                <label className='mt-10'>Destination</label>

                <select className="select border-[1px] border-white  bg-night w-full">
                    {
                        ntl.devices.map(device=>{
                            let selected = -1
                            if (device.constructor.name == "Station")
                                return <option selected={!!(++selected)}>{device.Name}</option>
                        })
                    }
                </select>

            </div>
            <label className='mt-10'>Start at : (seconds)</label>
            <input name='seconds'  type="number" min={0} placeholder="Type here" defaultValue={0} className="input  bg-darknight text-light w-full "/>
        </div>
    )

}