import React, { useEffect } from 'react';
import NavBar from '../ReactComponants/High/Navbar';
import Dashboard from '../ReactComponants/High/Dashboard';
import Emulator from '../ReactComponants/High/Emulator';


function Application(props) {
    useEffect(() => {
        const handler = event => event.preventDefault()
        window.addEventListener("resize",handler)
    
        // Clean up the event listener
        return () => window.removeEventListener("resize",handler)
      }, []);
    return (
        <div className="flex flex-col h-screen bg-midnight overflow-hidden   text-white mx-auto resize-none">
            <NavBar/>
            <div className="flex flex-1">
                <Dashboard/>
                <Emulator/>
            </div>
        </div>
    );
}

export default Application;