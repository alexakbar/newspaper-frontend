/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Navbar } from "src/components/common";
import Select from "react-select";
import CategoryRequest, {
  GetCategoryResponseData,
} from "src/requests/CategoryRequest";
import SourceRequest, {
  GetSourceResponseData,
} from "src/requests/SourceRequest";
import NewsRequest, { SearchNewsResponseData } from "src/requests/NewsRequest";
import Datepicker from "react-tailwindcss-datepicker";
// empty state
import { EmptyState } from "src/components/common";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const [isPersonalized, setPersonalized] = React.useState(false);
  const [token, setToken] = React.useState("");

  // filter data
  const [categories, setCategories] = React.useState<
    GetCategoryResponseData[] | []
  >([]);
  const [sources, setSources] = React.useState<GetSourceResponseData[] | []>(
    []
  );
  // set option
  const [optionsCategories, setOptionsCategories] = React.useState<any[]>([]);
  const [optionsSources, setOptionsSources] = React.useState<any[]>([]);

  // filter value
  const [filterSearch, setFilterSearch] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState<any[] | null>(
    null
  );
  const [filterSource, setFilterSource] = React.useState<any[] | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // handle change date range
  const handleValueChange = (newValue: any) => {
    setDateRange(newValue);
  };

  // news data
  const [listNews, setListNews] = React.useState<SearchNewsResponseData[] | []>(
    []
  );

  const getNews = async () => {
    const getNewsFromApi = await NewsRequest.searchNews({
      categories: filterCategory,
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
      sources: filterSource,
      q: filterSearch,
    });

    setListNews(getNewsFromApi.data);
  };

  // get token from session storage
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setToken(sessionToken!);
    } else {
      setToken("");
    }

    // get user data from session storage
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);

      if (userData.is_personalized) setPersonalized(true);
      else setPersonalized(false);
    }

    setTimeout(() => {
      if (!isPersonalized && token) {
        window.location.href = "/personalize";
      }
    }, 1000);
  }, [isPersonalized, token]);

  // load reference data
  useEffect(() => {
    const loadCategories = async () => {
      const response = await CategoryRequest.getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    };

    const loadSources = async () => {
      const response = await SourceRequest.getSources();
      if (response.data) {
        setSources(response.data);
      }
    };

    loadCategories();
    loadSources();
    getNews();
  }, []);

  // set option categories
  useEffect(() => {
    if (categories) {
      const data = categories.map((e) => {
        return {
          value: e.id.toString(),
          label: e.name,
        };
      });
      setOptionsCategories(data);
    }
  }, [categories]);

  useEffect(() => {
    if (sources) {
      const data = sources.map((e) => {
        return {
          value: e.id.toString(),
          label: e.name,
        };
      });
      setOptionsSources(data);
    }
  }, [sources]);

  useEffect(() => {
    getNews();
  }, [
    filterSearch,
    filterCategory,
    filterSource,
    dateRange.startDate,
    dateRange.endDate,
  ]);

  return (
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              News
            </h1>
            <p className="max-w-lg mx-auto mt-4 text-gray-500">
              Read news online and customize your magazines.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Search by keywords
              </label>
              <input
                type="text"
                placeholder="Search here..."
                onChange={(e) => {
                  setFilterSearch(e.target.value);
                }}
                className="block  mt-2 w-full placeholder-gray-700/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:text-gray-700 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Filter by category
              </label>
              <Select
                isMulti
                name="colors"
                options={optionsCategories}
                onChange={(selected) => {
                  setFilterCategory(selected.map((e) => e.label));
                }}
                className="react-select"
                classNamePrefix="react-select"
                classNames={{
                  control: (base) => `block mt-2 w-full px-5 py-0.5`,
                }}
              />
            </div>
            <div>
              <label
                htmlFor="source"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Filter by source
              </label>
              <Select
                isMulti
                name="colors"
                options={optionsSources}
                onChange={(selected) => {
                  setFilterSource(selected.map((e) => e.value));
                }}
                className="react-select"
                classNamePrefix="react-select"
                classNames={{
                  control: (base) => `block mt-2 w-full px-5 py-0.5`,
                }}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm text-gray-500 dark:text-gray-300 mb-2"
              >
                Filter by date
              </label>
              <Datepicker
                classNames={{
                  input: (base) =>
                    `relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-white dark:text-gray-700 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20`,
                }}
                value={dateRange}
                onChange={(date) => {
                  handleValueChange(date);
                }}
              />
            </div>
          </div>
          {listNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
              {listNews.map((news) => {
                return (
                  <div>
                    <div className="relative">
                      <img
                        className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                        src={
                          news.image ??
                          process.env.PUBLIC_URL +
                            "/placeholder/dummy-image.png"
                        }
                        alt=""
                      />
                      <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
                        <div className="mx-4">
                          <h1 className="text-sm text-gray-700 dark:text-gray-200">
                            {news.author || "Anonymous"}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                      {news.title}
                    </h1>
                    <hr className="w-32 my-6 text-blue-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {news.description
                        ? news.description +
                          (news.description.length > 150 ? "..." : "")
                        : "No description"}
                    </p>
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
                    >
                      Read more
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
