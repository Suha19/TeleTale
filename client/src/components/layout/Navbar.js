import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='index.html'>
          <i class='fas fa-feather' />
          TelaTale
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='!#'>Stories</Link>
        </li>
        <li>
          <Link to='!#'>Writers</Link>
        </li>
        <li>
          <Link to='!#'>About</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
