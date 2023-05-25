import { Navbar } from "src/components/common";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import RegisterRequest from "src/requests/Register";

interface IRegisterPageProps {}

interface DefaultResponseAPI {
  data: Array<any>;
  message: string;
  status: string;
}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [c_password, setCPassword] = React.useState("");
  const [token, setToken] = React.useState("");

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

  // do register
  const doRegister = async () => {
    await RegisterRequest.doRegister({
      username,
      email,
      password,
      c_password,
    })
      .then((res) => {
        const responseBody = res.data;
        const token = responseBody.token;
        const userData = responseBody.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
      })
      .catch((reason: AxiosError<DefaultResponseAPI>) => {
        const errorResponse = reason.response?.data;
        if (errorResponse?.data) {
          const errors = errorResponse.data;
          for (const [key, value] of Object.entries(errors)) {
            toast.error(`${value}`);
          }
        }
      });
  };

  // disabled button if fields is empty
  const isDisabled =
    (username === "" && email === "" && password === "") || c_password === "";

  return (
    <>
      <Navbar />
      <div className="flex items-center h-5/6">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="px-6 py-4">
            <form className="w-full max-w-md">
              <div className="flex justify-center mx-auto"></div>
              <div className="flex items-center justify-center mt-4">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                  Register
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Username"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
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
                  onChange={(e) => {
                    setCPassword(e.target.value);
                  }}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={doRegister}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Register
                </button>
                <div className="mt-6 text-center ">
                  <Link
                    to="/login"
                    className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Already have an account?
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

export default RegisterPage;
