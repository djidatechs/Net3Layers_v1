import { Device } from "./Device"

export class Station extends Device {
    static station_id = 1
    // - Station : nom de la station, nombre de cartes réseaux, carte d’accès distant ou pas. 
    constructor(Name="St "+Station.station_id++ , nics_number=6 , rac=false ){
        super(Name)
        this.nic_list = new Array (nics_number).fill({mac_adress :undefined,to_device : undefined,to_port : undefined})
        this.nic_list.map((nic,index)=>nic.mac_adress='@'+Name+'_mac'+index)
        this.rac = rac
    }
    set_name (new_Name) {this.Name=new_Name}
    connect_nic (target_device_id , target_port_id , fiber_type) {}
}