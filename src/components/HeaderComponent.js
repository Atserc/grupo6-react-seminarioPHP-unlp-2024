import logo from '../assets/images/logo.jpg';
import NavBarComponent from './NavBarComponent';

function HeaderComponent() {
  return (
    <header className='sm:flex sm:justify-between sm:items-center p-5'>
        <img src={logo} alt="logo" className='h-10'/>
        <NavBarComponent />
    </header>
  );
}

export default HeaderComponent;