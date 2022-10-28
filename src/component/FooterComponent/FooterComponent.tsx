import React from 'react';
import { Link } from 'react-router-dom';

export function FooterComponent () {

  return (
    <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022  Jeremy De l'Eglise</div>
      <Link to="about"><div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">About</div></Link>
    </footer>

  );
}