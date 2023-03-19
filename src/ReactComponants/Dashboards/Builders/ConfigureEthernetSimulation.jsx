import React, { useEffect } from 'react';
import { useNet3Layers } from '../../../Context/Netlayers';
import Trames from './ConfigureTrameSimulation';

function ConfigureEthernetSimulation(props) {
    const {animation_controller , setAnimation_controller} = useNet3Layers()

    const changeMethode = () => {
        const methode_radio = document.querySelector("input[name='methode_radio']:checked");
        const {textContent : methode} = document.querySelector(`label[for='${methode_radio.name}']`);
        setAnimation_controller(curr=>{ curr.data.methode = methode ||''  ; return curr})
    }
    const changeDuplex = (e) => {
        const full_duplex = e.target.checked
        setAnimation_controller(curr=>{ curr.data.full_duplex = full_duplex  ; return curr})
    }
    const changeMessageReciption = (e) => {
        const msg_recp = e.target.checked
        setAnimation_controller(curr=>{ curr.data.msg_recp = msg_recp  ; return curr})
    }
    const changeDemoEmission = (e) => {
        const demo_emission = e.target.checked
        setAnimation_controller(curr=>{ curr.data.demo_emission = demo_emission  ; return curr})
    }

    
    useEffect(()=>{
        //methode
        changeMethode()
        //duplex 
        setAnimation_controller(curr=>{ curr.data.full_duplex = true  ; return curr})
        //msg recp
        setAnimation_controller(curr=>{ curr.data.msg_recp = false  ; return curr})
        //demo_emission
        setAnimation_controller(curr=>{ curr.data.demo_emission = false  ; return curr})
        //

    },[])

    
  
    return (
        <>
        <div className='ml-2'>
            <div className="text-center">Methode</div>

            <BinaryRadio FirstChoice={"RealTime"} SecondChoice={"Automatic"} radio={"methode_radio"} onChange={changeMethode}/>        

            <div className="text-center">Settings</div>

            <ToggleSetting text={"Full duplex"} onChange={changeDuplex}  defaultChecked/>
            <ToggleSetting text={"Message de reciption"} onChange={changeMessageReciption} />
            <ToggleSetting text={"Demo émission"} onChange={changeDemoEmission} />
        </div>
        <Trames/>         

        <div className='divider'></div>
        <div className='text-center p-2 text-lg w-11/12 mx-auto font-bold bg-evening rounded-xl mt-5 mb-3 hover:bg-darknight transition duration-200 cursor-pointer '>
            Start
        </div>
        </>
    );
}

export default ConfigureEthernetSimulation;


const ToggleSetting =({text,onChange , defaultChecked=false})=>(
    <div className="w-5/6 ">
        <label className="cursor-pointer label ">
        <span className="label-text text-white font-semibold text-lg">{text}</span> 
        <input onChange={onChange} type="checkbox" className="toggle bg-black checked:bg-night" defaultChecked={defaultChecked} />
        </label>
    </div>
)


export const BinaryRadio = ({FirstChoice , SecondChoice ,onChange , radio ,inline})=>(
    <div className={(inline?'flex':'')}>
        <div className={(inline? 'w-4/6' : "w-5/6")} >
            <label className="label cursor-pointer" for={radio} id={'id_1_'+radio}>
                <span className="label-text text-white font-semibold text-lg">{FirstChoice}</span> 
                <input onChange={onChange} type="radio" name={radio} className="radio bg-white checked:bg-red-500" defaultChecked />
            </label>
        </div>

        {inline ? <div className='w-[10px]'></div> : <></>}

        <div className={(inline? 'w-4/6' : "w-5/6")} >
            <label className="label cursor-pointer" for={radio} id={'id_2_'+radio}>
                <span className="label-text text-white font-semibold text-lg">{SecondChoice}</span> 
                <input onChange={onChange} type="radio" name={radio} for={radio} className="radio bg-white checked:bg-blue-500"  />
            </label>
        </div>
    </div>
)

