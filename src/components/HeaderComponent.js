import logo from '../assets/images/png_logo_256.png';
import NavBarComponent from './NavBarComponent';

function HeaderComponent() {
  return (
    <header className='headerCSS sm:flex sm:justify-between sm:items-center p-5'>
        <img src={logo} alt="logo" className='h-16'/>
        <h1 className='text-2xl font-bold'> Inmobilaria Alpha Version</h1>
        <NavBarComponent />
    </header>
  );
}

export default HeaderComponent;