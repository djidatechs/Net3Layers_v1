import React from 'react';

function Zoom({setScale}) {
    const In = () => {
        setScale(current=>({
            x : current.x+0.1 > 1.3 ? 1.3 : current.x+0.1,
            y : current.y+0.1 > 1.3 ? 1.3 : current.y+0.1
        }))
    }
    const Out = () => {
        setScale(current=>({
            x : current.x-0.1 < 0.5 ? 0.5 : current.x-0.1,
            y : current.y-0.1 < 0.5 ? 0.5 : current.y-0.1
        }))
    }

    return (
        <div className='z-[99] absolute left-1 top-1 text-white space-x-3'>
         <button onClick={In} className='underline'>Zoom In </button>
         <button onClick={Out} className='underline'>Zoom Out </button>
        </div>
    );
}

export default Zoom;