import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserRegisterMutation } from "../features/api/apiSlice";
import Response from "../components/Response";
import LoadingButton from "../components/loading/LoadingButton";

const Signup = () => {
  window.scrollTo({ top: 0 });
  const location = useLocation()?.search?.split("?id=")[1];
  const [signupData, signupResponse] = useUserRegisterMutation();
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("visitor");

  const signupHandler = () => {
    signupData({
      role,
      email,
      registeredBy: location ? "sales" : "Self",
      sales: location ? location : undefined,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="pt-32 pb-10">
      <Response
        response={signupResponse}
        setPending={setPending}
        type="signup"
      />
      <div class="max-w-sm px-12 py-8 rounded-lg border shadow-lg mx-auto">
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Register as
          </label>
          <select
            name=""
            id=""
            className="w-full border-gray-300 border rounded-lg p-3"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="visitor">Visitor</option>
            <option value="company">Company</option>
            <option value="sales">Sales</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="repeat-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repeat password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="repeat-password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <LoadingButton
          pending={pending}
          onClick={signupHandler}
          title="Create new account"
          color="bg-main"
          width="w-48"
        />
      </div>
    </div>
  );
};

export default Signup;
