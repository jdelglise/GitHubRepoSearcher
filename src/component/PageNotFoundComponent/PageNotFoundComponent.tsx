import React from 'react';
import { Link } from 'react-router-dom';


export function PageNotFoundComponent() {

  return (
    <div className="container max-w-full flex-grow bg-white/[.85] dark:bg-slate-800 text-slate-900 dark:text-white overflow-auto">
        <div className="grid grid-rows-3 gap-4 place-items-center">
            <h1 className="font-bold text-blue-600 text-9xl">404</h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl dark:text-white">
                <span className="text-red-500">Oops!</span> Page not found
            </h6>

            <p className="mb-8 text-center text-gray-500 md:text-lg dark:text-white">
            The page you’re looking for doesn’t exist.
            </p>

            <Link to="/">Return to home</Link>
        </div>
    </div>
  );
}