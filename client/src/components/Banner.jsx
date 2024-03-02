import { Slide } from "react-slideshow-image";
const slideImages = ["image-1.jpg", "image-a.jpg", "image-b.jpg"];
const Banner = () => {
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="slide-container mt-4 relative w-full h-full bg-blue-500"
    >
      <Slide
        autoplay={false}
        infinite={true}
        duration={1000}
        arrows={false}
        transitionDuration={4000}
        indicators={false}
        pauseOnHover={false}
        responsive={true}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div>
              <div className="flex dark:text-gray-300 py-4 flex-col lg:flex-row gap-1 px-main  rounded-lg bg-indigo-600 text-white items-start md:items-center justify-between w-full">
                <img
                  src="./add2.jpg"
                  alt=""
                  className="w-full md:w-44 h-32 rounded-sm"
                />
                {/* <House sx={{width:56,height:56}}/> */}
                <div className="flex py-8 flex-col items-start">
                  <p className="text-2xl mt-3 md:mt-0 font-bold">
                    Ethiopian business link
                  </p>
                  <p className="text-sm max-w-[300px] mt-2">
                    your business link portal. you can advert here with out
                    limit. feel free to contact.
                  </p>
                </div>
                <button className="py-2 mt-3 md:mt-0 px-2 w-40 rounded-md text-white bg-yellow-400 font-bold">
                  Work with us
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Banner;
