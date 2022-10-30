import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { GitHubRepoCardComponent } from "../GitHubRepoCardComponent/GitHubRepoCardComponent";
import { SearchBarComponent } from "../SearchBarComponent/SearchBarComponent";
import { components } from "../../models/models";
import configData from "../../config.json";
import { ErrorPopUpComponent } from "../ErrorPopUpComponent/ErrorPopUpComponent";

type GitHubResponseType = components["schemas"]["GitHubResponseType"];

export function HomeComponent() {
  const pageSize = configData.PAGE_SIZE; // This could be an option in the UI
  const resultsPerPage = configData.RESULTS_PER_PAGE; // This is the max possible value for GitHub API, put to max to avoid call limitation issue
  const pagePerRefresh = resultsPerPage / pageSize; // calculate the refresh rate needed to call GitHub API once the fetched list is over
  const searchEndpoint = configData.BASE_URL + "/" + configData.SEARCH_URI;

  // searchString is the search typed by the user in the dedicated input field
  const [searchString, setSearchString] = useState("");
  const searchHandler = (searchString: string) => {
    setSearchString(searchString);
    setApiPage(1); //If search changed, we want to query github api from begining
    setCurrentPage(0); // If search changed, we want to start from begining in the UI as well
  };

  const [nbPage, setNbPage] = useState(0);
  const [apiPage, setApiPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<GitHubResponseType>();
  const [error, setError] = React.useState<AxiosError>();

  const handleCloseError = () => {
    setError(undefined);
  };

  // This is the actual call to the backend (GitHub API), performed only if search changed (and more than 3 characters)
  // Or if we need to fetch a new page from the API (apiPage)
  useEffect(() => {
    let isCanceled = false;
    if (searchString.length > 3) {
      setIsLoading(true);
      axios
        .get(searchEndpoint, {
          params: {
            q: searchString,
            per_page: resultsPerPage,
            page: apiPage,
          },
        })
        .then((response) => {
          if (!isCanceled) {
            setApiResponse(response.data as GitHubResponseType);
            setNbPage(response.data.total_count / pageSize - 1);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
          console.log(error);
        });
    }
    return () => {
      //cleanup function
      isCanceled = true;
    };
  }, [searchString, apiPage]);

  // currentPage is the page from the UI point of view
  // With currently set value, 10 pages for 1 GitHub API call
  const [currentPage, setCurrentPage] = useState(0);

  // Function below is used to split the data received from Github to display it piece by piece, based on constants
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage % pagePerRefresh) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return apiResponse?.items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, apiResponse, pagePerRefresh]);

  return (
    <div className="container max-w-full min-h-max flex-grow bg-white/[.85] dark:bg-slate-800 text-slate-900 dark:text-white overflow-auto dark:[color-scheme:dark]">
      <SearchBarComponent
        searchString={searchString}
        searchHandler={searchHandler}
      ></SearchBarComponent>
      {error ? (
        <ErrorPopUpComponent
          error={error}
          handleCloseError={handleCloseError}
        ></ErrorPopUpComponent>
      ) : null}
      {isLoading ? (
        <div className="flex flex-col items-center pb-10">
          <svg
            aria-hidden="true"
            className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span>Fetching data from Github...</span>
        </div>
      ) : null}
      <div className="grid grid-cols-4 gap-4 place-items-center">
        {!isLoading
          ? currentTableData &&
            currentTableData.map((item) => {
              return (
                <GitHubRepoCardComponent
                  name={item.name}
                  startgazerCount={item.stargazers_count}
                  lastUpdate={item.updated_at}
                  description={item.description}
                  imgURL={item.owner.avatar_url}
                  repoUrl={item.html_url}
                ></GitHubRepoCardComponent>
              );
            })
          : null}
      </div>
      {/* Code below is the page navigator, might be put it in a separate component */}
      {nbPage > 0 && !isLoading && (
        <div className="flex flex-col items-center py-2">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {" "}
              {1 + currentPage * pageSize}{" "}
            </span>
            to
            <span className="font-semibold text-gray-900 dark:text-white">
              {" "}
              {apiResponse &&
              apiResponse.total_count < (currentPage + 1) * pageSize
                ? apiResponse.total_count
                : (currentPage + 1) * pageSize}{" "}
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white">
              {" "}
              {apiResponse && apiResponse.total_count}{" "}
            </span>
            Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setApiPage(Math.floor((currentPage - 1) / pagePerRefresh) + 1);
              }}
              className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l enabled:hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white disabled:opacity-50"
              disabled={currentPage < 1}
            >
              Prev
            </button>
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
                setApiPage(Math.floor((currentPage + 1) / pagePerRefresh) + 1);
              }}
              className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 enabled:hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white disabled:opacity-50"
              disabled={nbPage <= currentPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
