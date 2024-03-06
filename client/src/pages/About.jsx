import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Sponsors from "../components/Sponsors";

const About = () => {
  return (
    <div className="w-full flex flex-col relative bg-gray-50 bg-dark h-auto">
      <div
        style={{
          backgroundImage: "url('./image-4.jpg')",
          backgroundRepeat: false,
        }}
        className="h-[70vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      <div className="w-[70%] self-center rounded-md -mt-12 py-4 z-20 relative text-2xl h-auto bg-white bg-dark border shadow-xl">
        <div className="grid px-5 w-full place-items-center gap-y-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="text-sm">
            <p className="">we provide a flexible</p>
            <p className="">price for your</p>
            <p className="">ultimate business.</p>
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar
              className="text-red-500"
              value={70}
              text={`${70}%`}
            />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
        </div>
      </div>

      <div class="w-full px-main mt-24 flex items-center gap-10 flex-col md:flex-row">
        <div>
          <img class="w-[500px] h-[300px]" src="image-1.jpg" alt="" />
        </div>
        <div className="flex max-w-[500px] flex-col gap-4">
          <p className="font-bold text-2xl">
            Lorem ipsum dolor sit officia <br />
            amet consectetur.
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit, ametes dodu consectetur adipisicing elit.
            Omnis temporibus officia velit, distinctio eos veritatis elit omnis.
          </p>

          <p className="text-sm mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
            corrupti hic adipisci voluptatum nesciunt in maxime cumque, fugiat
            eligendi aliquam numquam placeat voluptates! Amet ipsa veritatis
            animi illum ea veniam!
          </p>

          <div
          className="flex gap-2 cursor-pointer text-white text-center w-52 mt-2 rounded-full py-3 px-x items-center justify-center bg-main"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
          Read more
        </div>
        </div>
      </div>

      <p className="px-main text-2xl self-center mt-24 font-bold">Our teams</p>
      <div className="grid w-full place-items-center px-main self-center gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((e, i) => {
          return (
            <div
              key={i}
              className="flex relative w-full rounded-sm justify-start py-4 gap-1 flex-col items-enter"
            >
              <div className="relative">
                <img
                  src="./teda.jpg"
                  alt=""
                  className="w-full h-44 object-fill object-center"
                />
                <div className="absolute text-sm z-10 bottom-2 right-2 rounded-full px-4 py-2 text-white bg-orange-500">
                  CEO and Owner
                </div>
              </div>

              <p className="font-bold text-sm mt-1">Tewodros kebede</p>
              <p className="text-sm">Founder and CEO at Skylight technology</p>
              <p className="text-sm">tewodroskebede@gmail.com</p>
            </div>
          );
        })}
      </div>

      <p className="px-main text-2xl px-main mt-24 font-bold">Sponsors</p>
      <p className="px-main mt-2">People works with us</p>
      <Sponsors />
    </div>
  );
};

export default About;
