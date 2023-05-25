/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Transition } from "@headlessui/react";
import {
  HomeModernIcon,
  NewspaperIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const [isMobileToggleOpen, setMobileToggle] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isPersonalized, setPersonalized] = useState("");

  // get token from session storage
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setLoggedIn(true);
    }

    // get user data from session storage
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);

      // get username from user data
      setUsername(userData.username);
      setPersonalized(userData.is_personalized);
    }
  }, []);

  const doLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLoggedIn(false);

    window.location.href = "/login";
  };

  return (
    <nav
      x-data="{ isMobileToggleOpen: false }"
      className="relative bg-white shadow dark:bg-gray-800"
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/">
              <NewspaperIcon className="w-8 h-8 text-gray-800 dark:text-white" />
            </Link>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => {
                  setMobileToggle(!isMobileToggleOpen);
                }}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isMobileToggleOpen ? (
                  <svg
                    x-show="isMobileToggleOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    x-show="!isMobileToggleOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`${
              isMobileToggleOpen
                ? "translate-x-0 opacity-100 "
                : "opacity-0 -translate-x-full"
            } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-0">
              {isPersonalized && isLoggedIn && (
                <Link
                  to="/"
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  News
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
              )}
              {isMobileToggleOpen && isLoggedIn && (
                <Link
                  to="/profile"
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
              )}
              {isMobileToggleOpen && isLoggedIn && (
                <div
                  onClick={doLogout}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </div>
              )}
            </div>
            {isLoggedIn && !isMobileToggleOpen && (
              <div className="flex items-center mt-4 lg:mt-0">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button
                      className="flex items-center focus:outline-none"
                      aria-label="toggle profile dropdown"
                    >
                      <h3 className="mx-2 text-gray-700 dark:text-gray-200 text-base">
                        {username}
                      </h3>
                      <div className="w-8 h-8 overflow-hidden rounded-full">
                        <img
                          src="/user-placeholder.png"
                          className="object-cover w-full h-full"
                          alt="avatar"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        {isPersonalized && isLoggedIn && (
                          <Link to="/profile">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={`
                                ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                }
                                'block w-full px-4 py-2 text-left text-sm'
                              `}
                                >
                                  Your Profile
                                </button>
                              )}
                            </Menu.Item>
                          </Link>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={doLogout}
                              type="button"
                              className={`
                                ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                }
                                'block w-full px-4 py-2 text-left text-sm'
                              `}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
