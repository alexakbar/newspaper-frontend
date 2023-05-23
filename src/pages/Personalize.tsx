import React, { useEffect } from "react";
import { Navbar } from "src/components/common";
import Select from "react-select";

interface IPersonalizePageProps {}

const PersonalizePage: React.FunctionComponent<IPersonalizePageProps> = (
  props
) => {
  const [isPersonalized, setPersonalized] = React.useState(false);

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

  const myOptions: readonly any[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "blueberry", label: "Blueberry" },
    { value: "blackberry", label: "Blackberry" },
    { value: "banana", label: "Banana" },
  ];

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
                    options={myOptions}
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
                    options={myOptions}
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
                    options={myOptions}
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
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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
