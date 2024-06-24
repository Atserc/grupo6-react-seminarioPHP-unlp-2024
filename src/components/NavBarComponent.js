import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNavLinkClass } from '../utils/index';
import { RESERVAS_INDEX, TIPO_PROPIEDADES_INDEX, INDEX, LOCALIDADES_INDEX} from '../routes'

function NavBarComponent(){
    return (
        <nav>
            <ul className='flex space-x-4'>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to={INDEX}>Propiedades</NavLink>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to={TIPO_PROPIEDADES_INDEX}>Tipo Propiedades</NavLink>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to={LOCALIDADES_INDEX}>Localidades</NavLink>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to={RESERVAS_INDEX}>Reservas</NavLink>
            </ul>
        </nav>
    );
};

export default NavBarComponent;