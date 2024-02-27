import {
  LightMode,
  Menu,
  Message,
  Nightlight,
  Notifications,
  Search,
} from "@mui/icons-material";
import React, { useContext } from "react";
import { mobileContext } from "../pages/dashboard/HomeDashboard";

const Header = () => {
  const context = useContext(mobileContext);
  const menuHandler = () => {
    context.mobile === true
      ? context.setMobile(false)
      : context.setMobile(true);
  };

  return (
    <div className="w-full py-[10px]  flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          onClick={menuHandler}
          className={`border cursor-pointer ${context.borderColor}   md:hidden flex px-2 py-1 rounded-sm`}
        >
          <Menu sx={{ width: 16, height: 16 }} />
        </div>
      </div>
      <div className="flex items-center justify-center w-auto h-auto gap-3 px-2">
        <div
          className={`relative hidden  border ${context.borderColor}  small  md:flex items-center gap-1 pr-2 rounded-sm`}
        >
          <input
            type="text"
            placeholder="search"
            className={`rounded-sm w-52 ${
              context.nightMode ? "bg-gray-800" : "bg-white"
            }  focus:outline-none px-2 py-1`}
          />
          <Search sx={{ width: 16, height: 16 }} />
        </div>
        <div
          onClick={() =>
            context.nightMode
              ? context.setNightMode(false)
              : context.setNightMode(true)
          }
          className={`border ${context.borderColor}  cursor-pointer  flex items-center gap-1 px-2 py-1 rounded-sm`}
        >
          {context.nightMode ? (
            <LightMode sx={{ width: 16, height: 16 }} />
          ) : (
            <Nightlight sx={{ width: 16, height: 16 }} />
          )}
        </div>
        <div
          className={`relative border small  flex items-center gap-1 px-2 py-1 ${context.borderColor}  rounded-sm`}
        >
          <Message sx={{ width: 16, height: 16 }} />
          <div
            className={`absolute px-[1px] text-center -top-2 -right-2 border ${context.borderColor}  text-white h-5 w-5 rounded-full bg-red-500`}
          >
            16
          </div>
        </div>
        <div
          className={`relative cursor-pointer border ${context.borderColor}  small  flex items-center gap-1 px-2 py-1 rounded-sm`}
        >
          <Notifications sx={{ width: 16, height: 16 }} />
          <div
            className={`absolute px-[1px] text-center -top-2 -right-2 border ${context.borderColor}  text-white h-5 w-5 rounded-full bg-red-500`}
          >
            9
          </div>
        </div>

        <div
          className={`h-8 w-8 flex items-center rounded-full border ${context.borderColor} `}
        >
          <img src="./gedi.jpg" alt="" className="h-full w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
