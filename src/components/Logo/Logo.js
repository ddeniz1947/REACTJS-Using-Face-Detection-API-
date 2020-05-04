import React from 'react';
import Tilt from 'react-tilt';
import brain from './icons8-brain-100.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2 bg-gray" options={{ max: 55 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3"> <img src={brain}></img> </div>
            </Tilt>
        </div>
    )
}

export default Logo;