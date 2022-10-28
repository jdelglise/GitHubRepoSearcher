import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function HeaderComponent() {


  const [isDark, setDarkMode] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  },[isDark])

  return (
    <div className="box bg-white dark:bg-slate-800  px-6 py-8 ring-1 ring-slate-900/5 shadow-xl md:flex md:p-6 ">
      <Link className="text-black decoration-black dark:decoration-white" to="/">
        <div className="flex items-center pl-14">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 35 35" stroke="currentColor" fill="none">
            <path d="M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z"></path>
          </svg>
          <p className="pr-4 dark:text-white text-base tracking-tight">
             GitHub Repo Searcher
          </p>
        </div>
      </Link>
      <div className="absolute right-0 w-40 mr-14">
        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer self-end">
          <input type="checkbox" value="" id="default-toggle" className="sr-only peer" onClick={() => isDark ? setDarkMode(false) : setDarkMode(true) } />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark mode</span>
            </label>
      </div>
    </div>
 
  );
}