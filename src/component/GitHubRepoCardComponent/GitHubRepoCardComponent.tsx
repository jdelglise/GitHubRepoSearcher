import React from "react";

interface gitHubRepoCardProp {
  imgURL: string;
  name: string;
  description: string;
  repoUrl: string;
  startgazerCount: number;
  lastUpdate: string;
}

// Could be devined in an utility library if needed to be used in other places
// Transform ISO date into a local date (e.g : dd/mm/yyyy in my case)
function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function GitHubRepoCardComponent(props: gitHubRepoCardProp) {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-slate-800 dark:border-gray-700 items-center">
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-gray-700">
        <div className="flex flex-col items-center pt-5 pb-5">
          <img
            className="mb-3 w-12 h-12 rounded-full shadow-lg"
            src={props.imgURL}
            alt="repo avatar"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white text-center px-2">
            {props.name}
          </h5>
          <div className="flex items-center">
            <p className="ml-4 text-sm">{props.startgazerCount}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 28 26"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 26"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <p className="mr-4 text-sm">{formatDate(props.lastUpdate)}</p>
          </div>
          <span className="text-ellipsis text-sm text-gray-500 dark:text-gray-400 overflow-hidden text-center px-2">
            {props.description}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a
              href={props.repoUrl}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Visit repo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
