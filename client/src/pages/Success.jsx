import React, { useEffect, useState } from "react";
import {
  useCreateBoostMutation,
  useUpdateMutation,
} from "../features/api/apiSlice";
import Response from "../components/Response";
import Loading from "../components/loading/Loading";
import PageNotFound from "../components/PageNotFound";

const Success = () => {
  const [boostData, boostResponse] = useCreateBoostMutation();
  const [boostPending, setBoostPending] = useState(false);
  const data = JSON.parse(window.localStorage.getItem("etb_link_system"));
  useEffect(() => {
    // const data = JSON.parse(paymentData);
    boostData({
      company: data?.company,
      amount: data?.amount,
      paymentMethod: data?.paymentMethod,
      type: data?.type,
    });
  }, []);
  console.log(data, "success");
  return (
    <div className="text-xl font-extrabold w-full h-full  flex gap-3 flex-col items-center justify-center">
      <Response
        response={boostResponse}
        setPending={setBoostPending}
        redirectTo={
          data?.type === "boost"
            ? "/dashboard/company/boosting"
            : data?.type === "subscription"
            ? "/dashboard/company/subscription"
            : data?.type === "fund"
            ? "/dashboard/company/billing"
            : "/dashboard/company"
        }
        type="payment"
      />
      {data ? (
        <div className="p-5 rounded-lg border shadow-lg bg-white">
          <p className="font-bold">We are making things ready for you.</p>
          <p className="text-sm max-w-screen-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
            commodi explicabo a dignissimos sequi! Quisquam nostrum.
          </p>
          <div className="px-2 py-2 flex gap-1 items-center justify-center text-2xl font-extrabold">
            <Loading /> <p>Paying...</p>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default Success;
