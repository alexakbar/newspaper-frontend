import React, { useEffect } from "react";
import { Navbar } from "src/components/common";
import { ModalForm } from "src/components/common";
import { TagIcon } from "@heroicons/react/24/outline";
import ProfileRequest, { getProfile } from "src/requests/ProfileRequest";
import CategoryRequest, { GetCategoryResponseData } from "src/requests/CategoryRequest";
import SourceRequest, { GetSourceResponseData } from "src/requests/SourceRequest";
import AuthorRequest, { GetAuthorResponseData } from "src/requests/AuthorRequest";
import { ModalOnSave, ModalSelectionData } from "src/components/common/modal_form";
import { PropsValue } from "react-select";
import api from "src/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IProfilePageProps {}

interface DefaultResponseAPI {
  data: Array<any>;
  message: string;
  status: string;
}

interface IPreferencesData {
  sources: string[] | null,
  categories: string[] | null,
  authors: string[] | null,
}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const [token, setToken] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [preferences, setPreferences] = React.useState<IPreferencesData>({sources: null, categories: null, authors: null})

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [modalOptionData, setModalOptionData] = React.useState<any[] | []>([]);
  const [modalCallback, setModalCallback] = React.useState<ModalOnSave>(() => {});
  const [modalDefaultValue, setModalDefaultValue] = React.useState<PropsValue<any>[] | null>(null)

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
  const [category, setCategory] = React.useState<PropsValue<any>[] | null>(null);
  const [source, setSource] = React.useState<PropsValue<any>[] | null>(null);
  const [author, setAuthor] = React.useState<PropsValue<any>[] | null>(null);

  useEffect(() => {
    document.body.classList.add("bg-gray-100");
    return () => {
      document.body.classList.remove("bg-gray-100");
    };
  }, []);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (!sessionToken) {
      window.location.href = "/login";
    } else {
      setToken(sessionToken!);
    }
  }, [isModalOpen]);

  useEffect(() => {
    getProfile();
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
      // set default category)
      setCategory(data.filter(val => preferences.categories?.includes(val.value)))
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
      // set default source
      setSource(data.filter(val => preferences.sources?.includes(val.value)))
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
      // set default author
      setAuthor(data.filter(val => preferences.authors?.includes(val.value)))
    }
  }, [authors]);

  const getProfile = async () => {
    const getProfileFromApi = await ProfileRequest.getProfile();
    setUsername(getProfileFromApi.data.username);
    setEmail(getProfileFromApi.data.email);
    setPreferences({
      sources: JSON.parse(getProfileFromApi.data.preferred_sources),
      authors: JSON.parse(getProfileFromApi.data.authors),
      categories: JSON.parse(getProfileFromApi.data.categories),
    })
  };

  const doSave = async (postData: any) => {
    await api.post("/set-personalize", postData, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .then((res) => {
        const responseBody = res.data.data;
        const userData = responseBody;
        sessionStorage.setItem("user", JSON.stringify(userData));
      })
      .catch((reason: AxiosError<DefaultResponseAPI>) => {
        toast.error(reason.response?.data.message);
      });
  };

  return (
    <>
      <Navbar />
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        optionData={modalOptionData}
        onSave={modalCallback}
        selectDefaultValue={modalDefaultValue}
      />
      <div className="container mx-auto my-10 max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-bold text-gray-700 dark:text-white">
            My Profile
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Personal details.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Username
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 dark:text-gray-300 sm:mt-0">
                {username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Email
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 dark:text-gray-300 sm:mt-0">
                {email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Preferred sources
              </dt>
              <dd className="mt-2 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <TagIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium dark:text-gray-300">
                          No sources selected
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          setModalOptionData(optionsSources)
                          setModalCallback(() => {
                            return (selectedValue: ModalSelectionData[]) => {
                              doSave({
                                preferred_sources: selectedValue.map(e => e.value),
                              });
                              setSource(selectedValue)
                              setModalOpen(false)
                            }
                          })
                          setModalDefaultValue(source)
                          setModalOpen(true);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Authors
              </div>
              <div className="mt-2 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <TagIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium dark:text-gray-300">
                          No sources selected
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 tex-gray-400">
                      <button
                        type="button"
                        onClick={() => {
                          setModalOptionData(optionsAuthors)
                          setModalCallback(() => {
                            return (selectedValue: ModalSelectionData[]) => {
                              doSave({
                                authors: selectedValue.map(e => e.value),
                              });
                              setAuthor(selectedValue)
                              setModalOpen(false)
                            }
                          })
                          setModalDefaultValue(author)
                          setModalOpen(true);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Categories
              </div>
              <div className="mt-2 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <TagIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium dark:text-gray-300">
                          No sources selected
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 tex-gray-400">
                      <button
                        type="button"
                        onClick={() => {
                          setModalOptionData(optionsCategories)
                          setModalCallback(() => {
                            return (selectedValue: ModalSelectionData[]) => {
                              doSave({
                                categories: selectedValue.map(e => e.value),
                              });
                              setCategory(selectedValue)
                              setModalOpen(false)
                            }
                          })
                          setModalDefaultValue(category)
                          setModalOpen(true);
                        }}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Update
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
