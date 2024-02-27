import React, { useContext } from "react";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import SidebarItems from "./SidebarItems";
import { useNavigate } from "react-router-dom";
import { mobileContext } from "../pages/dashboard/HomeDashboard";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    sessionStorage.removeItem("gsm-user");
    navigate("/login");
  };
  const context = useContext(mobileContext);
  const role = context.role;

  const messageHandler = () => {
    switch (role) {
      case "customer": {
        return ["Representative", "Lawyers", "Public"];
      }
      case "super-admin": {
        return ["Representative", "Lawyers", "Public"];
      }
      case "representative-main": {
        return ["Representatives", "Lawyers", "Public", "CEO"];
      }
      case "representative-regular": {
        return ["Representative", "Lawyers", "Public", "CEO", "Lawyer"];
      }
      case "representative-external": {
        return ["Representative", "Lawyers", "Public", "CEO", "Lawyer"];
      }
      case "lawyer": {
        return ["Representative", "Customer", "Public"];
      }
    }
  };

  return (
    <div id="sidebar" className={`${props.value}`}>
      <div
        className={`h-[91.2vh] border border-t-0 ${context.borderColor}  overflow-hidden w-full  flex flex-col gap-1`}
      >
        <div
          className={`flex py-2 gap-1 border-b ${context.borderColor} flex-col items-center justify-center`}
        >
          <img
            src="./gedi.jpg"
            alt=""
            className={`w-12 h-12 border ${context.borderColor} rounded-full `}
          />
          <p className="text-[14px] mt-1 ">Gedeon agmas</p>
          <p className="small">{role.split("-").join(" ")}</p>
        </div>

        <div className="flex mt-2 flex-col h-[90.5vh] overflow-y-scroll overflow-hidden gap-2  w-full ">
          <SidebarItems
            title="Dashboard"
            id="dashboard"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            path={`/dashboard?${role}`}
          />

          <SidebarItems
            title="Service areas"
            id="serviceArea"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            path={`/dashboard/service-area?${role}`}
          />

          <SidebarItems
            title="Case chart"
            id="case-chart"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            children={["Active case", "Closed case"]}
            paths={[
              "/dashboard/case-chart?active",
              "/dashboard/case-chart?closed",
            ]}
          />

          <SidebarItems
            title="Applications"
            id="customer-applications"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            children={["New applications", "Previous applications"]}
            paths={[
              "/dashboard/applications?new",
              "/dashboard/applications?previous",
            ]}
          />

          <SidebarItems
            title="Messaging"
            id="messaging"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            children={messageHandler()}
            paths={messageHandler().map(
              (p) => `/dashboard/chat?${p.toLowerCase()}`
            )}
          />

          <SidebarItems
            title="Payment & billing"
            id="payment"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            children={
              role === "customer"
                ? ["Payed", "Pending", "Canceled", "Add fund"]
                : ["Payed", "Pending", "Canceled"]
            }
            paths={[
              "/dashboard/payment?payed",
              "/dashboard/payment?pending",
              "/dashboard/payment?canceled",
            ]}
          />

          {role === "super-admin" && (
            <SidebarItems
              title="Roles"
              id="roles"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              children={["All roles", "Create new"]}
              paths={["/dashboard/role-all", "/dashboard/role-create"]}
            />
          )}

          {role === "super-admin" ? (
            <SidebarItems
              title="Lawyers"
              id="lawyers"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              children={["Total lawyers", "Register new"]}
              paths={["/dashboard/lawyer?total", "/dashboard/lawyer?new"]}
            />
          ) : (
            <SidebarItems
              title="Lawyers"
              id="lawyers"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              path={`/dashboard/lawyer?${role}`}
            />
          )}

          {role === "super-admin" ? (
            <SidebarItems
              title="Representatives"
              id="representatives"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              children={["Internal", "External", "Register new"]}
              paths={[
                "dashboard/representative?internal",
                "dashboard/representative?external",
                "dashboard/representative?new",
              ]}
            />
          ) : (
            <SidebarItems
              title="Representatives"
              id="representatives"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              path={`dashboard/representative?${role}`}
            />
          )}

          {role !== "customer" && (
            <SidebarItems
              title="Customers"
              id="customers"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              path={`/dashboard/customers?${role}`}
            />
          )}

          {role !== "super-admin" && (
            <SidebarItems
              title="Consulting"
              id="consulting"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              path={`/dashboard/consulting?${role}`}
            />
          )}

          {role !== "super-admin" && (
            <SidebarItems
              title="Tutorials"
              id="tutorials"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              path={`/dashboard/tutorials?${role}`}
            />
          )}

          {role === "super-admin" && (
            <SidebarItems
              title="Client type"
              id="clientType"
              icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
              path="/dashboard/client-type"
            />
          )}

          <SidebarItems
            title="Profile"
            id="profile"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            path="/role/all"
          />

          <SidebarItems
            title="Reports"
            id="reports"
            icon={<KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />}
            path={`/dashboard/reports?${role}`}
          />

          <div
            onClick={logoutHandler}
            className="flex cursor-pointer mb-2 px-6 gap-4"
          >
            <KeyboardDoubleArrowRight sx={{ width: 12, height: 12 }} />
            <p className="">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
