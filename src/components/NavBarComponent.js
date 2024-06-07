import React from 'react';
import { Link } from 'react-router-dom';

function NavBarComponent(){
    const taiwindLI = 'text-lg hover:text-xl hover:font-bold transition-all duration-200'
    return (
        <nav>
            <ul className='flex space-x-4'>
                <li className={taiwindLI}>
                    <Link to="/">Propiedades</Link>
                </li>
                <li className={taiwindLI}>
                    <Link to="/tipoPropiedades">Tipo Propiedades</Link>
                </li>
                <li className={taiwindLI}>
                    <Link to="/reservas">Reservas</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBarComponent;