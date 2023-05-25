import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "src/components/common";
import API from "../api";
import { log } from "console";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ILoginPageProps {}

interface DefaultResponseAPI {
  data: Array<any>;
  message: string;
  status: string;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // get token from session storage
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setToken(sessionToken!);
    } else {
      setToken("");
    }

    if (token !== "") {
      // get user data from session storage
      const sessionUser = sessionStorage.getItem("user");
      if (sessionUser) {
        const userData = JSON.parse(sessionUser!);
        if (!userData.is_personalized) {
          window.location.href = "/personalize";
        } else {
          window.location.href = "/";
        }
      } else {
        window.location.href = "/";
      }
    }
  }, [token]);

  const doLogin = async () => {
    await API.post("/login", {
      email,
      password,
    })
      .then((res) => {
        const responseBody = res.data.data;
        const token = responseBody.token;
        const userData = responseBody.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
      })
      .catch((reason: AxiosError<DefaultResponseAPI>) => {
        toast.error(reason.response?.data.message);
      });
  };

  // disabled button if username or password is empty
  const isDisabled = email === "" && password === "";

  useEffect(() => {
    document.body.classList.add("bg-gray-100");
    return () => {
      document.body.classList.remove("bg-gray-100");
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center h-5/6">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="px-6 py-4">
            <form className="w-full max-w-md">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                />
              </div>
              <div className="flex items-center justify-center mt-4">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                  Login
                </h1>
              </div>
              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={doLogin}
                  disabled={isDisabled}
                  type="button"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Login
                </button>
                <div className="mt-6 text-center ">
                  <Link to="/register">
                    <a
                      href="#"
                      className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                    >
                      Don’t have an account yet? Register
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
