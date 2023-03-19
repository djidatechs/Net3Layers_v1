import { Componant } from "../Componant"

export class Cable extends Componant {
    constructor(  connector1 , connector2 , port1,port2 ,port1_type,port2_type  ,  name ,length=30  ){
        super(name)
        this.length = length
        this.connector1 = connector1
        this.connector2 = connector2
        this.port1 = port1
        this.port2 = port2
        this.port1_type = port1_type 
        this.port2_type = port2_type 
        
        let points = get_points_list(connector1,connector2)
        this.ui = {points}
    }
}

function get_points_list (dv1,dv2) {
    
    return []
}