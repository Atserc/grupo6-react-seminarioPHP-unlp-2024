import { NavLink } from 'react-router-dom';
import logo from '../assets/images/png_logo_256.png';
import NavBarComponent from './NavBarComponent';
import { INDEX } from '../routes';

function HeaderComponent() {
  return (
    <header className='headerCSS bg-gray-300 sm:flex sm:justify-between sm:items-center p-5'>
        <NavLink to={INDEX}>
          <img src={logo} alt="logo" className='h-16'/>
        </NavLink>
        <h1 className='text-2xl font-bold'> Inmobilaria 1.0</h1>
        <NavBarComponent />
    </header>
  );
}

export default HeaderComponent;