import React from 'react';
import { Link } from 'react-router-dom';

function NavBarComponent(){
    return (
        <nav>
            <ul className='flex gap-3'>
                <li>
                    <Link to="/">Propiedades</Link>
                </li>
                <li>
                    <Link to="/tipoPropiedades">tipo Propiedades</Link>
                </li>
                <li>
                    <Link to="/reservas">Reservas</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBarComponent;