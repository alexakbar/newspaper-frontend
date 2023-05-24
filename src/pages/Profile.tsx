import React, { useEffect } from "react";
import { Navbar } from "src/components/common";
import { ModalForm } from "src/components/common";
import { TagIcon } from "@heroicons/react/24/outline";
import ProfileRequest, { getProfile } from "src/requests/ProfileRequest";

interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

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

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getProfileFromApi = await ProfileRequest.getProfile();
    setUsername(getProfileFromApi.data.username);
    setEmail(getProfileFromApi.data.email);
  };

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
