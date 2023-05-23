import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "src/components/common";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { ModalForm } from "src/components/common";
import { PaperAirplaneIcon, TagIcon } from "@heroicons/react/24/outline";

interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

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
    }
  }, [isModalOpen]);

  return (
    <>
      <Navbar />
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        optionData={[
          { value: "1", label: "Engineering" },
          { value: "2", label: "Backend" },
          { value: "3", label: "Frontend" },
        ]}
      />
      <div className="container mx-auto my-10 max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-bold text-gray-700 dark:text-white">
            Applicant Information
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Username
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 dark:text-gray-300 sm:mt-0">
                Margot Foster
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Email
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 dark:text-gray-300 sm:mt-0">
                Margot Foster
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 dark:text-gray-300 sm:mt-0">
                Margot Foster
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                Authors
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
                          Engineering, Backend
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {}}
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
                Category
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
                          Engineering, Backend
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 tex-gray-400">
                      <button
                        type="button"
                        onClick={() => {
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
                Category
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
                          Engineering, Backend
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 tex-gray-400">
                      <button
                        type="button"
                        onClick={() => {
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
