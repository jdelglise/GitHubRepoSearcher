import React from 'react';

interface searchProp {
  searchString: string;
  searchHandler: (arg: string) => void;
  disable: boolean;
}

export function SearchBarComponent (props: searchProp) {

  return (
    <div className="bg-white dark:bg-slate-800  px-20 pt-4 pb-8 ring-slate-900/5 bg-opacity-25 dark:bg-opacity-25">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input disabled={ props.disable } type="search" onChange={ e => e.target.value.length >= 4 ? props.searchHandler(e.target.value) : null } id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for repo" required />
        {/* Search will only start if minimum 4 characters, in order to avoid to launch too many queries as github limits us to 30 calls per 30 minutes*/ }
      </div>
    </div>

  );
}