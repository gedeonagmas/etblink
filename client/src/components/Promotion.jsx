import React from "react";

const Promotion = () => {
  return (
    <div className="rounded-2xl gap-2 relative bg-red-200 ">
      <div className="flex items-center gap-3 justify-between px-[5%] py-[2%]">
        {/* left */}
        <div className="flex-grow w-[100%] flex flex-col gap-y-3">
          <div className="text-2xl mb-1">
            <h3 className="">Wellcome</h3>
            <h3 className="font-semibold">Gedion agmas</h3>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam.
            </p>
          </div>
          <div className="flex mt-2 gap-4 items-center">
            <button className="px-5 uppercase bg-main py-2 rounded-full  text-white">
              Become pro
            </button>
            <button className="px-5 uppercase border border-black bg-white bg-dark py-2 rounded-full text-dark  text-black">
              No thanks
            </button>
          </div>
        </div>
        {/* right */}
        <div className="w-[40%] hidden md:flex items-center  justify-end">
          <div>
            <img
              src="https://th.bing.com/th/id/R.175b3802f7c5c4c98b9bcbdf9a7b9945?rik=98ox9lTe%2ffYIwA&pid=ImgRaw&r=0"
              alt=""
            />
          </div>
          <div className="flex items-center justify-evenly gap-x-3">
            <div className="h-[7px] bg-white"></div>
            <div className="h-[7px] bg-white"></div>
            <div className=" h-[7px] bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
