import React from "react";
import { useReadQuery } from "../features/api/apiSlice";

const OurPartners = () => {
  const {
    data: sponsors,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/sponsors", tag: ["sponsors"] });

  return (
    <div className="pt-32 px-main flex flex-col items-center justify-center py-20">
      <p className="text-xl mt-10 mb-10 font-bold">OUR PARTNERS</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-5">
        {sponsors &&
          sponsors?.data?.length > 0 &&
          sponsors?.data?.map((e) => {
            return (
              <img
                key={e?._id}
                src={e?.sponsorImage}
                alt="sponsor image"
                className="w-full h-[80px] rounded-sm border"
              />
            );
          })}
      </div>
    </div>
  );
};

export default OurPartners;
