import { ArrowRight, KeyboardArrowRight } from "@mui/icons-material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { mobileContext } from "../pages/dashboard/HomeDashboard";

const SidebarItems = (props) => {
  props.children?.paths && console.log(props.children?.paths[0], "aaaaaaaaaa");
  const context = useContext(mobileContext);

  const navigateHandler = (id1) => {
    const ids1 = document.getElementById(id1);
    const ids2 = document.getElementById(id1 + "-icon");
    ids1?.classList?.value?.includes("hidden")
      ? (ids1?.classList.remove("hidden"),
        ids1?.classList.add("flex"),
        ids2?.classList.remove("rotate-0"),
        ids2?.classList.add("rotate-90"))
      : (ids1?.classList.remove("flex"),
        ids1?.classList.add("hidden"),
        ids2?.classList.remove("rotate-90"),
        ids2?.classList.add("rotate-0"));
  };

  return (
    <div
      className={`relative p-2 pl-4 pr-2 border-b ${context.borderColor} w-full h-auto`}
    >
      <Link
        to={props?.path}
        onClick={() => navigateHandler(props.id)}
        className="flex w-full small 
         relative cursor-pointer items-center justify-between px-2"
      >
        <div
          id="marker"
          onClick={() => context.setMobile(false)}
          className="flex gap-4"
        >
          {props.icon}
          <p className="">{props.title}</p>
        </div>

        {props.children && (
          <div className="">
            <ArrowRight
              sx={{ width: 24, height: 24 }}
              id={props.id + "-icon"}
              className={`self-end p-1 
              `}
            />
          </div>
        )}
      </Link>

      <div
        id={props.id}
        className={` hidden ml-8 mt-1 
         small  flex-col gap-2`}
      >
        {props.children &&
          props.paths &&
          props.children?.map((child, i) => {
            return (
              <Link
                to={props?.paths[i]}
                key={i}
                className="flex cursor-pointer items-center gap-3"
                onClick={() => context.setMobile(false)}
              >
                {/* <div
                  className={`h-2 w-2 rounded-full bg-gray-200 border ${context.borderColor}`}
                ></div>{" "} */}
                <KeyboardArrowRight sx={{ width: 12, height: 12 }} />
                <p className="">{child}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarItems;
