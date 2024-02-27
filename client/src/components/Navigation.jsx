import Sidebar from "./Sidebar";
import Charts from "./Charts";
import Header from "./Header";
import Categories from "./Categories";
import Logs from "../pages/dashboard/Logs";
import Tables from "./Tables";
import { useGetSingleRoleQuery } from "../redux/apiSlice";
import { useEffect, useState } from "react";

const Home = () => {
  const [roleId, setRoleId] = useState("");
  const { data: roleData } = useGetSingleRoleQuery({
    id: JSON.parse(sessionStorage.getItem("gsm-user")).role,
  });

  useEffect(() => {}, [roleData]);
  roleData && console.log(roleData, "role data");
  return (
    <div className="w-full text-[14px] h-auto flex bg-gray-200">
      {roleData && roleData.role_name === "SuperAdmin" ? (
        <div className="w-full h-auto flex bg-gray-200">
          <Sidebar />
          <div className="flex h-[100vh]  overflow-y-scroll py-1 flex-col w-full">
            <Header />
            <div className="w-auto px-4 mt-3 mb-2 flex flex-col">
              <p className="font-extrabold text-gray-500">
                home/
                <span className="cursor-pointer text-blue-500">dashboard</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full items-center justify-center h-[100vh] flex bg-gray-200">
          Please login first to continue.
        </div>
      )}
    </div>
  );
};

export default Home;
