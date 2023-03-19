import { Hub } from "../../Models/Device/Hub";
import { InternetRouter } from "../../Models/Device/InternetRouter";
import { Station } from "../../Models/Device/Station";
import { Switch } from "../../Models/Device/Switch";

export function device_creator (device, ...props) {
    switch (device) {
    case 'Hub':
        return new Hub(...props)
    case 'Switch':
        return new Switch(...props)
    case 'Station':
        return new Station(...props)
    case 'InternetRouter':
        return new InternetRouter(...props)
      default:
        throw new Error('Invalid device type');
    }
}
export function device_remover (net3layers,id_) {
    const id = id_
    let cables_indexToRemove = []
    if ( net3layers.cables.length)
        net3layers.cables.map((item,index) =>{
            if (item.connector1 == id || item.connector2 == id ) {cables_indexToRemove.push(index) }
        })

    if (cables_indexToRemove.length) {
        let array = net3layers.cables
        net3layers.cables = splicer(cables_indexToRemove,array)
        
        // net3layers.cables= net3layers.cables.filter((cable,index)=> {
        //     console.log("hol" ,cables_indexToRemove,index , cables_indexToRemove.includes(index))
        //     return !(cables_indexToRemove.includes(index))
        //  } )
        // let x = net3layers.cables.filter((cable,index)=> {
        //     console.log("hol" ,cables_indexToRemove,index , cables_indexToRemove.includes(index))
        //     return (cables_indexToRemove.includes(index))
        //  } )
        //  console.log({ntl:net3layers.cables,x})
    
    }
       
    let device_id_to_remove
    net3layers.devices.map((item,index) =>{if (item.id == id) {device_id_to_remove=index }  })
    net3layers.devices.splice(device_id_to_remove,1) 

    console.log({id,cables_indexToRemove,device_id_to_remove})

}


function splicer(arrayOfIndexes, array) {
    // Sort the indices in descending order to avoid issues with array indices shifting during removal
    let indicesToRemove = arrayOfIndexes.sort((a, b) => b - a);
    
    // Remove the elements at the specified indices from the array
    for (let i of indicesToRemove) {
      array.splice(i, 1);
    }
    
    return array;
  }
  