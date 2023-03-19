import PortSection from "./PortSection"

export function SwitchPortControl ({Switch}){
    return (
        <>
            <PortSection device_id={Switch.id} list={Switch.normal_ports_list} type={"Normal"}  text={"Normal ports"} />
            <PortSection device_id={Switch.id} list={Switch.cascade_ports_list} type={"Cascade"}  text={"Cascade ports"} />
            <PortSection device_id={Switch.id} list={Switch.q802n1_ports_list} type={"802.1q"}  text={"802.1q ports"} />
        </>
    )
}
export function HubPortControl ({Hub}){
    return (
        <>
        <PortSection device_id={Hub.id} list={Hub.normal_ports_list}  type={"Normal"} text={"Normal ports"} />
        <PortSection device_id={Hub.id} list={Hub.cascade_ports_list}  type={"Cascade"} text={"Cascade ports"} />
        </>
    )
}
export function StationPortControl ({Station}){
    return <PortSection device_id={Station.id} list={Station.nic_list} type={"nic"} text={"NICs"}/>
}
export function InternetRouterPortControl ({InternetRouter}) {
    return <PortSection device_id={InternetRouter.id} list={InternetRouter.nic_list} type={"nic"} text={"NICs"} />
}