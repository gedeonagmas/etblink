import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Sponsors from "../components/Sponsors";

const About = () => {
  const teams = [
    {
      name: "Tewodros Kebede",
      role: "CEO and Owner",
      description: "Founder and CEO at Skylight technology",
      email: "tewodroskebed@gmail.com",
    },
  ];

  return (
    <div className="w-full flex flex-col relative bg-gray-50 bg-dark h-auto">
      <div
        style={{
          backgroundImage: "url('./image-4.jpg')",
          backgroundRepeat: false,
        }}
        className="h-[70vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      {/* <div className="w-[70%] self-center rounded-md -mt-12 py-4 z-20 relative text-2xl h-auto bg-white bg-dark border shadow-xl">
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
            <CircularProgressbar value={40} text={`${70}%`} />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
          <div className="h-20 w-20">
            <CircularProgressbar value={70} text={`${70}%`} />
          </div>
        </div>
      </div> */}

      <div class="w-full px-main mt-24 flex items-center gap-10 flex-col md:flex-row">
        <div>
          <img class="w-[500px] h-[280px]" src="image-1.jpg" alt="" />
        </div>
        <div className="flex max-w-[500px] flex-col gap-4">
          <p className="font-bold text-2xl">Company</p>
          <p className="text-sm">
            Ethiopian Business Link (ETB Link) is an Online Business link
            directory developed by a sister company, skylight Technology PLC.
            Making us one of the first truly dedicated online directories for
            local businesses. The Ethiopian Business Link (etblink.com) is a way
            of leaving behind the time-consuming, search for different
            businesses at the Search Engine. We can help your business get
            noticed and drive more customers to your door.
          </p>

          <p className="text-sm mt-2">
            Ethiopian Business Link (etblink.com) is a comprehensive online
            portal dedicated to promoting and connecting businesses within
            Ethiopia and globally. Our platform serves as a hub for business
            news, insights, and networking opportunities in various industries,
            including technology, finance, agriculture, healthcare, and more.
          </p>

          {/* <div className="flex gap-2 cursor-pointer text-white text-center w-52 mt-2 rounded-full py-3 px-x items-center justify-center bg-main">
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
          </div> */}
        </div>
      </div>

      <p className="font-light mt-14 px-main text-lg">
        Join us at ETBLink.com to stay informed about the latest business
        trends, connect with like-minded professionals, and explore new
        opportunities for success in the dynamic Ethiopian business landscape.
        Let us be your bridge to a thriving business future.
      </p>
      <p className="mt-14 px-main">
        At ETBLink.com, we aim to foster collaboration and growth within the
        Ethiopian business community by providing a central space for businesses
        to showcase their products and services, share industry knowledge, and
        engage with potential partners and customers. Whether you are a start-up
        entrepreneur or an established corporation, ETBLink.com offers a rang of
        resources and tools to support your business goals and expansion
        efforts.
      </p>
      <p className="px-main text-2xl self-center mt-14 font-bold">Our teams</p>
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
      <div className="w-full px-main">
        <Sponsors />
      </div>
    </div>
  );
};

export default About;
