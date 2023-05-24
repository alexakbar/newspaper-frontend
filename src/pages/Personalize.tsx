import React, { useEffect } from "react";
import { Navbar } from "src/components/common";
import Select from "react-select";
import SourceRequest, { GetSourceResponseData } from "src/requests/SourceRequest";
import CategoryRequest, { GetCategoryResponseData } from "src/requests/CategoryRequest";
import AuthorRequest, { GetAuthorResponseData } from "src/requests/AuthorRequest";
import api from "src/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IPersonalizePageProps {}

interface DefaultResponseAPI {
  data: Array<any>;
  message: string;
  status: string;
}

const PersonalizePage: React.FunctionComponent<IPersonalizePageProps> = (
  props
) => {
  const [isPersonalized, setPersonalized] = React.useState(false);
  const [token, setToken] = React.useState("");

  // Option Data
  const [categories, setCategories] = React.useState<
    GetCategoryResponseData[] | []
  >([]);
  const [sources, setSources] = React.useState<GetSourceResponseData[] | []>(
    []
  );
  const [authors, setAuthors] = React.useState<GetAuthorResponseData[] | []>(
    []
  );
  const [optionsCategories, setOptionsCategories] = React.useState<any[]>([]);
  const [optionsSources, setOptionsSources] = React.useState<any[]>([]);
  const [optionsAuthors, setOptionsAuthors] = React.useState<any[]>([]);

  // Data
  const [category, setCategory] = React.useState<any[] | null>(null);
  const [source, setSource] = React.useState<any[] | null>(null);
  const [author, setAuthor] = React.useState<any[] | null>(null);

  useEffect(() => {
    document.body.classList.add("bg-gray-100");
    return () => {
      document.body.classList.remove("bg-gray-100");
    };
  }, []);

  useEffect(() => {
    // get token from session storage
    const sessionToken = sessionStorage.getItem("token");

    if (sessionToken) {
      setToken(sessionToken!)
      const sessionUser = sessionStorage.getItem("user");
      if (sessionUser) {
        const userData = JSON.parse(sessionUser);
        if (userData.is_personalized) {
          setPersonalized(true);
        }
      }
    }

    if (isPersonalized) window.location.href = "/";
  }, []);

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

    const loadAuthors = async () => {
      const response = await AuthorRequest.getAuthors();
      if (response.data) {
        setAuthors(response.data);
      }
    };

    loadCategories();
    loadSources();
    loadAuthors();
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
    if (authors) {
      const data = authors.map((e) => {
        return {
          value: e.id.toString(),
          label: e.name,
        };
      });
      setOptionsAuthors(data);
    }
  }, [authors]);

  const isDisabled = !category && !source && !author;

  const doSave = async () => {
    await api.post("/set-personalize", {
      authors: author,
      categories: category,
      preferred_sources: source,
    }, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => {
        const responseBody = res.data.data;
        const userData = responseBody;
        sessionStorage.setItem("user", JSON.stringify(userData));
        window.location.href = '/'
      })
      .catch((reason: AxiosError<DefaultResponseAPI>) => {
        toast.error(reason.response?.data.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center h-5/6">
        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="px-6 py-4">
            <form className="w-full max-w-4xl">
              <div className="flex items-center justify-center mt-4">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                  Personalize Your Preferences
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-8">
                <div>
                  <label
                    htmlFor="search"
                    className="block text-sm text-gray-500 dark:text-gray-300"
                  >
                    Category
                  </label>
                  <Select
                    isMulti
                    name="colors"
                    options={optionsCategories}
                    className="react-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 20,
                      }),
                    }}
                    classNames={{
                      control: (base) => `block mt-2 w-full px-5 py-1`,
                    }}
                    placeholder="Select category here..."
                    onChange={(selected) => {
                      setCategory(selected.map((e) => e.value));
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="search"
                    className="block text-sm text-gray-500 dark:text-gray-300"
                  >
                    Source
                  </label>
                  <Select
                    isMulti
                    name="colors"
                    options={optionsSources}
                    className="react-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 20,
                      }),
                    }}
                    classNames={{
                      control: (base) => `block mt-2 w-full px-5 py-1`,
                    }}
                    placeholder="Select source here..."
                    onChange={(selected) => {
                      setSource(selected.map((e) => e.value))
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="search"
                    className="block text-sm text-gray-500 dark:text-gray-300"
                  >
                    Authors
                  </label>
                  <Select
                    isMulti
                    name="colors"
                    options={optionsAuthors}
                    className="react-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 20,
                      }),
                    }}
                    classNames={{
                      control: (base) => `block mt-2 w-full px-5 py-1`,
                    }}
                    placeholder="Select authors here..."
                    onChange={(selected) => {
                      setAuthor(selected.map((e) => e.value))
                    }}
                  />
                </div>
              </div>
              <div className="mt-6">
                <button 
                  onClick={doSave}
                  disabled={isDisabled}
                  type="button"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalizePage;
