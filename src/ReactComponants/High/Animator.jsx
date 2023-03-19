import React, { useEffect } from 'react';
import { useNet3Layers } from '../../Context/Netlayers';

function Animator({children}) {
    useEffect(() => {
        const animation = new window.Konva.Animation(frame => {})
        // animation.start() 
        return () => {animation.stop()}
    }, [])
    

    return (
        <div>
            {children}
        </div>
    );
}

export default Animator;