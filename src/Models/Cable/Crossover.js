import { Cable } from "./Cable";

export class Crossover extends Cable {
    static cable_id = 1
    
    constructor( connector1 , connector2 , port1,port2 ,port1_type,port2_type,  name='Crossover'+Crossover.cable_id++ ,length){
        super( connector1 , connector2 , port1,port2 ,port1_type,port2_type, name , length)
        
    }
}