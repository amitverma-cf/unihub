import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Search, Filter } from "lucide-react"; // Import Lucide icons

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query";
import ILoader from "@/components/blocks/ILoader";
import GridPostList from "@/components/blocks/GridPostList";
import { Models } from "appwrite";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: { documents: Models.Document[] } | undefined;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <div className="flex justify-center w-full py-6"><ILoader /></div>;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center w-full py-10">
        <p className="text-gray-500 dark:text-gray-400 text-center">No results found</p>
      </div>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue, fetchNextPage]);

  if (!posts)
    return (
      <div className="flex items-center justify-center w-full h-full py-10">
        <ILoader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults && 
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with search */}
      <div className="sticky px-6 top-0 bg-white dark:bg-gray-900 z-10 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Explore</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search posts"
            className="pl-10 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full h-10"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      {/* Trending section */}
      <div className="flex items-center justify-between w-full my-4 px-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Trending</h2>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 cursor-pointer">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">All</span>
          <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      {/* Grid of posts */}
      <div className="mt-4 px-6">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <div className="py-10 text-center">
            <p className="text-gray-500 dark:text-gray-400">No posts available</p>
          </div>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}

        {hasNextPage && !searchValue && (
          <div ref={ref} className="py-6 flex justify-center">
            <ILoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;