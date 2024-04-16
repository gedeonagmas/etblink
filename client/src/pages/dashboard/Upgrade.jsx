import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useUpgradeMutation,
  useUserRegisterMutation,
} from "./../../features/api/apiSlice";
import Response from "./../../components/Response";
import LoadingButton from "./../../components/loading/LoadingButton";

const Upgrade = () => {
  //   window.scrollTo({ top: 0 });
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [upgradeData, upgradeResponse] = useUpgradeMutation();
  const [pending, setPending] = useState(false);
  const [role, setRole] = useState("visitor");

  const upgradeHandler = () => {
    upgradeData({
      role,
      _id: user?._id,
      user: user?.user?._id,
    });
  };

  console.log(user, "user");
  return (
    <div className="pb-10">
      <Response
        response={upgradeResponse}
        setPending={setPending}
        type="upgrade"
      />
      <div class="max-w-sm px-12 py-8 rounded-lg border shadow-lg mx-auto">
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Upgrade as
          </label>
          <select
            name=""
            id=""
            className="w-full border-gray-300 border rounded-lg p-3"
            onChange={(e) => setRole(e.target.value)}
          >
            <option selected value="company">
              Company
            </option>
            <option value="sales">Sales</option>
          </select>
        </div>

        <LoadingButton
          pending={pending}
          onClick={upgradeHandler}
          title="Upgrade"
          color="bg-main"
          width="w-48"
        />
      </div>
    </div>
  );
};

export default Upgrade;
