import React from "react";
import { useReadQuery } from "../../features/api/apiSlice";

const Sales = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));

  const {
    data: sales,
    isFetching: salesFetching,
    isError: salesError,
  } = useReadQuery({
    url: `/user/companies?_id=${user?.user?._id}&populatingType=payments&populatingValue=sales`,
    tag: ["sales"],
  });

  console.log(sales, "sales");
  return (
    <div className="w-full relative pb-3 bg-gray-50 bg-dark h-auto">Sales</div>
  );
};

export default Sales;
