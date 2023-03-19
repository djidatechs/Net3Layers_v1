import React from 'react';
import { Link } from 'react-router-dom';
function Home(props) {
    return (
        <div className='bg-black text-white'>
            <Link to={"/application"}>Application</Link>
        </div>
    );
}

export default Home;