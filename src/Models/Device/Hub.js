import { Device } from "./Device"

export class Hub extends Device {
    static hub_id = 1
    constructor( Name="Hb "+Hub.hub_id++, normal_ports_capacity=4 , cascade_ports_capacity=2 ){
        // - Hub : nom, nombre de ports normaux et nombre de ports de cascade (les ports de cascade sont dessinés en gras).
        super(Name)
        this.normal_ports_list = new Array (normal_ports_capacity).fill({to_device : undefined , to_port : undefined})
        this.cascade_ports_list = new Array (cascade_ports_capacity).fill({to_device : undefined , to_port : undefined})
    }

    set_name (new_Name) {this.Name = new_Name}
    connect_port (target_device_id , target_port_id , fiber_type) {

    }



}


