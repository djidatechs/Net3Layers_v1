import React, { useEffect, useRef, useState } from 'react';

function DashboardSection({name , children}) {    
    const contentRef = useRef(0)
    const [content,setContent] = useState(true)
    
    useEffect(()=>{
        contentRef.current.classList.remove("opacity-0")
        
    },[])
    const toggleSection = () => {
      // contentRef.current.style.display= contentRef.current.style.display=="none" ? "" : "none"
     if (content) {
      setTimeout(() => {
        contentRef.current.classList.add("opacity-0")
      }, 100);
     }
      setContent(c=>!c)
      setTimeout(() => {
        contentRef.current.classList.remove("opacity-0")
      }, 10);
    }
    return (
      <>
        <div className=' relative space-y-1  border-2 border-light rounded-xl w-full' key={name}>
          <div className="cursor-pointer  w-full p-3 font-semibold" onClick={() => toggleSection()}>
            {name}
          </div>
          <div ref={contentRef} 
          className={`${content ? 'block opacity-0' : 'hidden'}   transition-opacity ease-in duration-300 min-h-[100px]  overflow-auto w-full `}
          >
            {children}
          </div>
          {content
          ? <div className='bg-night absolute left-3 -top-6 text-xl  font-bold p-[2px]'>-</div>
          : <div className='bg-night absolute left-3 -top-6 text-xl  font-bold p-[2px]'>+</div>
          }
        </div>
        </>
        
    );
}

export default DashboardSection;