import { Device } from "./Device"

export class Switch extends Device {
    static switch_id = 1
    constructor( Name ="Sw "+Switch.switch_id++, type=1, normal_ports_capacity=4 , cascade_ports_capacity=2 , q802n1_ports_capacity=0,vlan_capacity=0 , manage_stp = false  ){
        // - Switch : nom, nombre de ports normaux, de ports de cascade, de ports 802.1q, type 
        // (on the fly, store and forward), gestion spanning tree, niveau de vlan géré. 
        super(Name)
        this.normal_ports_list = new Array (normal_ports_capacity).fill({to_device : undefined , to_port : undefined})
        this.cascade_ports_list = new Array (cascade_ports_capacity).fill({to_device : undefined , to_port : undefined})
        this.q802n1_ports_list = new Array (q802n1_ports_capacity).fill({to_device : undefined , to_port : undefined})
        
        this.vlans = new Array (vlan_capacity).fill({vlan_id : undefined })
        this.type = type
        this.manage_stp = manage_stp
    }

    set_name (new_Name) {this.Name = new_Name}
    connect_port (target_device_id , target_port_id , fiber_type) {

    }



}


