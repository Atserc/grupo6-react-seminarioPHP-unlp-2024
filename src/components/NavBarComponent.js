import React from 'react';
import { Link } from 'react-router-dom';

function NavBarComponent(){
    return (
        <nav>
            <ul>
                <li>navbar</li>
                <li>
                    <Link to="/propiedades">Propiedades</Link>
                </li>
                <li>
                    <Link to="/inquilinos">Inquilinos</Link>
                </li>
                <li>
                    <Link to="/reservas">Reservas</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBarComponent;