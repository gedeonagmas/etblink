import { BreakfastDiningOutlined, DeckOutlined } from "@mui/icons-material";
import React from "react";

const Mission = () => {
  return (
    <div className="pt-32 bg-gray-200 bg-dark ">
      <div
        style={{
          backgroundImage: "url('./image-4.jpg')",
          backgroundRepeat: false,
        }}
        className="h-[50vh] bg-cover bg-center relative z-20 w-full"
      ></div>
      <div className="flex px-main w-full mb-20 mt-14 gap-10 flex-col md:flex-row">
        <div className="rounded-lg p-5 border bg-white bg-dark shadow-lg flex flex-col items-center justify-center">
          <BreakfastDiningOutlined sx={{ width: 56, height: 56 }} />
          <p className="text-xl font-bold mt-3">Mission</p>
          <p className="mt-3">
            To connect Ethiopian business with domestic and international
            opportunities, fostering growth, innovation, and collaboration in
            the local entrepreneurial ecosystem. We strive to provide accurate
            and up-to-date information about businesses in our directory, so
            that users can make informed decisions about their purchases.
          </p>
        </div>

        <div className="rounded-lg p-5 border bg-white bg-dark shadow-lg flex flex-col items-center justify-center">
          <DeckOutlined sx={{ width: 56, height: 56 }} />
          <p className="text-xl font-bold mt-3">Vision</p>
          <p className="mt-3">
            Empowering Ethiopian businesses to thrive on a global scale by
            providing a comprehensive online platform that facilitates
            networking, knowledge sharing, and access to resources and markets,
            driving economics development and prosperity in Ethiopia.
          </p>
        </div>
      </div>
      <p className="mt-10 mb-20 text-3xl font-bold px-20">
        We are looking forward to welcoming your company as our new business
        partner.
      </p>
    </div>
  );
};

export default Mission;
