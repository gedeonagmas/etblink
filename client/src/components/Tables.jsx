import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function Tables({ data, columns, title, hideTitle }) {
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#F9DDD3",
        // color: "white",
      },
    },
  };

  return (
    <div className="w-[100%] justify-center items-center h-auto bg-white flex flex-col gap-y-4 ">
      {hideTitle !== true && (
        <p className="text-gray-500 text-lg self-start font-bold px-2 -mb-2 mt-2">
          {title} ({data?.length})
        </p>
      )}
      <div className="flex flex-col bg-white w-full h-full">
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
