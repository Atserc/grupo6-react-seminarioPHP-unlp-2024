import React from 'react';

//import HeaderComponent from '../components/HeaderComponent';
import NavBarComponent from '../components/NavBarComponent';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/Header';

function LandingPage(){
    return (
        <div>
            {/*<HeaderComponent />*/}
            <Header />
            <NavBarComponent />
            <main>
                <h1>LandingPage</h1>
            </main>
            <FooterComponent />
        </div>
    );
};

export default LandingPage;