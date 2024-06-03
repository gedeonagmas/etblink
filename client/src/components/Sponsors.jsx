import { useReadQuery } from "../features/api/apiSlice";

const Sponsors = () => {
  const {
    data: sponsors,
    isFetching,
    isError,
  } = useReadQuery({ url: "/user/sponsors", tag: ["sponsors"] });

  return (
    <div className="w-full justify-between grid grid-cols-1 gap-y-10 h-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-start mt-10 relative">
      <p className="w-full rounded-sm text-2xl font-bold h-[80px] flex items-center justify-center bg-main text-white text-center">
        Partners
      </p>

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
  );
};

export default Sponsors;
