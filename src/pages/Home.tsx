/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { Navbar } from "src/components/common";
import Select from "react-select";
import { Navigate } from "react-router-dom";
import { DateRangePicker } from "rsuite";
import CategoryRequest, {
  GetCategoryResponseData,
} from "src/requests/CategoryRequest";
import SourceRequest, {
  GetSourceResponseData,
} from "src/requests/SourceRequest";
import NewsRequest, { SearchNewsResponseData } from "src/requests/NewsRequest";
import { log } from "console";

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
  const [optionsCategories, setOptionsCategories] = React.useState<any[]>([]);
  const [optionsSources, setOptionsSources] = React.useState<any[]>([]);

  // filter value
  const [filterSearch, setFilterSearch] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState<any[] | null>(
    null
  );
  const [filterSource, setFilterSource] = React.useState<any[] | null>(null);
  const [filterStartDate, setFilterStartDate] = React.useState("");
  const [filterEndDate, setFilterEndDate] = React.useState("");

  // news data
  const [listNews, setListNews] = React.useState<SearchNewsResponseData[] | []>(
    []
  );

  const getNews = async () => {
    const getNewsFromApi = await NewsRequest.searchNews({
      categories: filterCategory,
      start_date: filterStartDate,
      end_date: filterEndDate,
      sources: filterSource,
      q: filterSearch,
    });

    // console.log(getNewsFromApi);
    setListNews(getNewsFromApi.data);
  };

  // get token from session storage
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setToken(sessionToken!);
    } else {
      setToken("");
      window.location.href = "/login";
    }

    // get user data from session storage
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);

      if (userData.is_personalized) setPersonalized(true);
      else setPersonalized(false);
    } else {
      window.location.href = "/login";
    }

    setTimeout(() => {
      if (!isPersonalized && token) {
        window.location.href = "/personalize";
      }
    }, 1000);
  }, [isPersonalized, token]);

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
    filterStartDate,
    filterEndDate,
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
                className="block  mt-2 w-full placeholder-gray-700/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:text-gray-300 dark:focus:border-blue-300"
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
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Filter by date
              </label>
              <DateRangePicker
                onChange={(val) => {
                  setFilterStartDate(val?.[0].toISOString() || "");
                  setFilterEndDate(val?.[1].toISOString() || "");
                }}
                placeholder="Select date..."
                size="lg"
                className={"block  mt-2 w-full"}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {listNews.map((news) => {
              return (
                <div>
                  <div className="relative">
                    <img
                      className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                      src={news.image ?? "https://dummyimage.com/720x400"}
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
                    href="#"
                    className="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
                  >
                    Read more
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
