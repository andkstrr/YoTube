import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = searchParams.get("search_query");

  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (searchTerm) => {
    if (!query) {
      searchParams.delete("search_query");
      setSearchParams(searchParams);
    } else {
      if (location.pathname === "/watch") {
        navigate(`/?search_query=${searchTerm}`);
      } else {
        setSearchParams({ search_query: searchTerm });
      }
    }
  };

  return (
    <div className="flex flex-row w-2/5">
      <input
        type="text"
        placeholder="Telusuri"
        defaultValue={initialQuery}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
        className="w-full p-2 pl-4 rounded-l-3xl border border-slate-500 focus:border-blue-500 focus:outline-none placeholder:text-gray-500"
      />
      <button
        className="rounded-r-3xl font-medium border border-slate-500 w-20 flex justify-center items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
        onClick={() => handleSearch(query)}
      >
        <CiSearch className="w-6 h-6" />
      </button>
    </div>
  );
}
