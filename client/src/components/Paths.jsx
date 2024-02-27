import React from "react";
import { Link } from "react-router-dom";

const Paths = ({ paths }) => {
  return (
    <div className="w-full flex justify-between items-center py-2 px-2">
      {paths && (
        <div className="flex flex-col">
          <div className="title flex text-blue-500">
            <p className="uppercase">{paths[paths.length - 1].split("")[0]}</p>
            <p>
              {paths[paths.length - 1]
                .split("")
                .splice(1, paths[paths.length - 1].length - 1)}
            </p>{" "}
          </div>
          <div className="w-auto mb-2 mt-1 flex items-center">
            {paths.map((path, i) => (
              <div key={i} className="flex gap-4">
                {i !== paths.length - 1 && (
                  <Link
                    to={location.pathname
                      .split("/")
                      .splice(0, paths.length - 1)
                      .join("/")}
                  >
                    {path}/
                  </Link>
                )}
                {i === paths.length - 1 && (
                  <p className="text-blue-500">{paths.pop() + " >"}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-2 bg-red-500 h-auto w-auto">hello</div>
    </div>
  );
};

export default Paths;
