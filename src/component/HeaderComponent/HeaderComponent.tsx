import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HeaderComponent() {
  const [isDark, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="box bg-white dark:bg-slate-800  px-6 py-8 ring-1 ring-slate-900/5 shadow-xl md:flex md:p-6 ">
      <Link
        className="text-black decoration-black dark:decoration-white"
        to="/"
      >
        <div className="flex items-center pl-14">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            viewBox="0 0 35 35"
            stroke="currentColor"
            fill="none"
          >
            <path d="M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z"></path>
          </svg>
          <p className="pr-4 dark:text-white text-base tracking-tight">
            GitHub Repo Searcher
          </p>
        </div>
      </Link>
      <div className="absolute top-8 right-0 h-20 w-20 mr-10">
        {/*Previous version with simple toggle switch
          <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer self-end">
          <input type="checkbox" value="" id="default-toggle" className="sr-only peer" onClick={() => isDark ? setDarkMode(false) : setDarkMode(true) } />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500">
          </div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark mode</span> 
          </label>*/}
        <button
          id="theme-toggle"
          type="button"
          className="item-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm "
          onClick={() => (isDark ? setDarkMode(false) : setDarkMode(true))}
        >
          {!isDark ? (
            <svg
              id="theme-toggle-dark-icon"
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          ) : null}
          {isDark ? (
            <svg
              id="theme-toggle-light-icon"
              className="w-8 h-8"
              fill="yellow"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
            </svg>
          ) : null}
        </button>
      </div>
    </div>
  );
}
