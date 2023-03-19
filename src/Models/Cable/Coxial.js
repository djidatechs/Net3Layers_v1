import { Cable } from "./Cable";

export class Coxial extends Cable {
    static cable_id = 1
    constructor( connector1 , connector2 , port1,port2 ,port1_type,port2_type,  name='Coxial'+Coxial.cable_id++ ,length){
        super( connector1 , connector2 , port1,port2 ,port1_type,port2_type, name , length)
        
    }
}