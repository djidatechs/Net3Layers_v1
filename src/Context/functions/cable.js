import { Coxial } from "../../Models/Cable/Coxial"
import { Crossover } from "../../Models/Cable/Crossover"
import { telecom } from "../../Models/Cable/Telecom"
import { Straight_through } from "../../Models/Cable/straight_through"
export function cable_creator (net3layers, ...props) {
    
    const device_1 = net3layers.get_device(props[0])
    const device_2 = net3layers.get_device(props[1])
    const device_1_type = net3layers.get_device(props[2])
    const device_2_type = net3layers.get_device(props[3])
    
    let cable = "Crossover"
    if (device_1.constructor.name != device_2.constructor.name) cable = "Straight_through"

    switch (cable) {
    case 'Coxial':
        return new Coxial(...props)
    case 'Crossover':
        return new Crossover(...props)
    case 'Straight_through':
        return new Straight_through(...props)
    case 'Telecom':
        return new telecom(...props)
      default:
        throw new Error('Invalid cable type');
    }
}
export function cable_remover (net3layers,id) {
    let indexToRemove = null
    net3layers.cables.map((item,index) =>{if (item.id == id) {indexToRemove=index }  })
    // delete net3layers.cables[indexToRemove]
    net3layers.cables.splice(indexToRemove,1)

    
}