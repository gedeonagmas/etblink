import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Close } from "@mui/icons-material";
import DataTable from "react-data-table-component";

function Tables({ data, columns, title }) {
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "rgb(252,45,45)",
        color: "white",
      },
    },
  };

  return (
    <div className="w-[100%] justify-center items-center h-auto bg-white flex flex-col gap-y-4 ">
      <p className="text-gray-500 text-lg self-start font-bold px-2 -mb-2 mt-2">
        {title} ({data?.length})
      </p>
      <div className="flex flex-col px-2 bg-white w-full h-full">
        {data?.length > 0 ? (
          <DataTable
            columns={columns}
            data={data}
            selectableRows
            fixedHeader
            pagination
            defaultSortAsc
            customStyles={customStyles}
          ></DataTable>
        ) : (
          <p>there is no data to display</p>
        )}
      </div>
    </div>
  );
}
export default Tables;
