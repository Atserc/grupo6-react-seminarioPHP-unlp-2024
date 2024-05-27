import logo from '../assets/images/logo.jpg';

function HeaderComponent() {
  return (
    <header>
        <img src={logo} alt="logo"/>
        <h1>Header</h1>
    </header>
  );
}

export default HeaderComponent;