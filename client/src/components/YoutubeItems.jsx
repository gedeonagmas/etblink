import { Visibility } from "@mui/icons-material";

const YoutubeItems = () => {
  return (
    <div className="w-full bg-gray-200 bg-dark px-main py-10 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid cols-5 place-items-center gap-10">
      <div className="flex w-full justify-start gap-1 flex-col items-enter">
        <p className="text-lg">Our you tubes</p>
        <p className="text-sm">our latest you tube videos</p>

        <p className="text-xs mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, eaque
          rem laudantium cum reprehenderit commodi.
        </p>
        <p className="text-xs bg-blue-500 text-white px-4 py-2 rounded-sm mt-4 cursor-pointer flex items-center justify-center">
          Visit our channel{" "}
          <svg
            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </p>
      </div>

      {[0, 1, 2, 3].map((e, i) => {
        return (
          <div
            key={i}
            className="flex w-full rounded-sm relative justify-start py-4 gap-1 flex-col items-enter"
          >
            <img src="./image-3.jpg" alt="" className="w-full h-28" />
            <p className="font-bold text-sm mt-1">Video title</p>
            <p className="text-sm">Videos sub title description</p>
            <div className="flex gap-2 items-center justify-between w-full">
              <div className="flex items-center justify-center gap-2">
                <Visibility sx={{ width: 20, height: 20 }} />{" "}
                <p className="text-xs">2500 views</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
                </svg>

                <p className="text-xs">2000 likes</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default YoutubeItems;
