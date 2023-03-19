import React from 'react';
import { useNet3Layers } from '../../Context/Netlayers';
import Conception from '../Dashboards/Conception';

import Internet from '../Dashboards/Internet';
import Transport from '../Dashboards/Transport';
import Ethernet from '../Dashboards/Ethernet';


function Dashboard({hidden=false}) {
    
    if (hidden) return <></> 
    return (
        <div className="w-1/4 bg-night  overflow-y-auto border-r-2 py-3 scrollbar  scrollbar-thumb-darknight scrollbar-track-night"
        style={{ height: 'calc(100vh - 46px)'}}
        >
           <DashboardChoices/>
        </div>
    );
}

export default Dashboard;

function DashboardChoices () {
    const {layers,setLayers} = useNet3Layers()
    switch (layers) {
        case 'Conception':
            return <Conception/>
        case 'Ethernet':
            return <Ethernet/>
        case 'Internet':
            return <Internet/>
        case 'Transport':
            return <Transport/>
          default:
             setLayers("Conception")
        }
}