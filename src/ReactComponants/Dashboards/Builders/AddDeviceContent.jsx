import React from 'react';
import hub_img from '../../../assets/Devices/Hub.svg'
import switch_img from '../../../assets/Devices/Switch.svg'
import station_img from '../../../assets/Devices/Station.svg'
import internet_img from '../../../assets/Devices/Internet.svg'
import { useNet3Layers } from '../../../Context/Netlayers';

function AddDeviceContent(props) {
    const net3layers = useNet3Layers()

    const add_switch = () =>{
        net3layers.add_device("Switch" )
        net3layers.synchronize_now()
        
        
    }
    const add_hub = () =>{
        net3layers.add_device("Hub" )
        net3layers.synchronize_now()
        
        
    }
    const add_internet = () =>{
        net3layers.add_device("InternetRouter" )
        net3layers.synchronize_now()
        
    }
    const add_station = () =>{
        net3layers.add_device("Station" )
        net3layers.synchronize_now()

    }
   
    return (
        <div className='grid grid-cols-2 gap-2 px-2 mb-5'>
            <Elemment style={"h-12 w-12"} text={"Hub"} icon={hub_img}  onClick={add_hub}  />
            <Elemment style={"h-12 w-12"} text={"Switch"} icon={switch_img}  onClick={add_switch}  />
            <Elemment style={"h-12 w-12"} text={"Station"} icon={station_img}  onClick={add_station}  />
            <Elemment style={"h-12 w-12"} text={"Internet"} icon={internet_img}  onClick={add_internet}  />
        </div>
    );
}

export default AddDeviceContent;



function Elemment ({text,icon,onClick , style}) {
    return (
        <div onClick={onClick} className={('group p-3 space-x-6 first:rounded-tl-xl last:rounded-br-xl bg-black  w-full hover:bg-midnight transition duration-300 cursor-pointer ')}>
            <img src={icon} alt={text} className={("group-hover:scale-125 transition duration-300 inline "+style)}/>
            <h1 className='text-md font-semibold mx-auto inline group-hover:text-light'>{text}</h1>
        </div>
    )
} 