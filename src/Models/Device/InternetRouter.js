import { Device } from "./Device"

export class InternetRouter extends Device {
    static internetrouter_id=1
    constructor(Name="Int "+InternetRouter.internetrouter_id++ , nic_number=6){
        super(Name)
        this.nic_list = new Array (nic_number).fill({to_device : undefined , to_port : undefined})
    }
}