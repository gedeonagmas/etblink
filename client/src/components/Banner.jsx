import { Slide } from "react-slideshow-image";
// const slideImages = ["skylightadd.jpg", "image-a.jpg", "image-b.jpg"];
const Banner = ({
  slideImages,
  duration,
  arrows,
  indicators,
  width,
  height,
}) => {
  console.log(slideImages, "slide images");
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="slide-container rounded-full relative w-full h-full "
    >
      <Slide
        autoplay={false}
        infinite={true}
        duration={duration}
        arrows={arrows}
        transitionDuration={4000}
        indicators={indicators}
        pauseOnHover={false}
        responsive={true}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              className={`${width} ${height} relative text-white dark:text-gray-200 flex gap-2`}
            >
              <img
                src={slideImage}
                alt=""
                className="w-full h-full rounded-sm object-fill object-center"
              />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Banner;
