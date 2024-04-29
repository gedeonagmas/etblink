import React from "react";
import Loading from "../../components/loading/Loading";
import { useReadQuery } from "../../features/api/apiSlice";

const Earns = () => {
  const id = JSON.parse(localStorage.getItem("etblink_user"));
  const {
    data: user,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useReadQuery({
    url: `/user/users?_id[eq]=${id?._id}&populatingType=users&populatingValue=user`,
    tag: ["users"],
  });

  console.log(user);
  return (
    <div className="w-full flex h-auto items-center justify-center flex-col">
      {userIsFetching && <Loading />}
      {userIsError && <p>Something went wrong unable to read the data</p>}
      {user && user?.data?.length > 0 && (
        <div className="w-full items-center justify-between flex gap-4">
          <div className="p-4 rounded-lg border shadow-md">
            <p className="text-gray-500">Total Balance</p>
            <p className="font-bold mt-2">
              {user?.data[0]?.user?.earn?.total} birr
            </p>
          </div>

          <div className="p-4 rounded-lg border shadow-md">
            <p className="text-gray-500">Paid Balance</p>
            <p className="font-bold mt-2">
              {user?.data[0]?.user?.earn?.withdraw} birr
            </p>
          </div>

          <div className="p-4 rounded-lg border shadow-md">
            <p className="text-gray-500">Current Balance</p>
            <p className="font-bold mt-2">
              {user?.data[0]?.user?.earn?.current} birr
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earns;
