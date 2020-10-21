import React from 'react';
import Logo from '../assets/img/oruga-logo.png';

const NavBar = () => {
   return(
      <nav className="navbar navbar-light bg-white shadow">
         <a href="/" className="navbar-brand">
            {/* <img src={Logo} width="128px" alt=""/> */}
            Gestión de Menú La Oruga
         </a>
      </nav>
   )
}

export default NavBar;