import React from "react";

const ProfilePicture = ({ user }) => {
  return (
    <div className="relative ml-4 py-1">
      {user?.role !== "company" && user?.user?.profilePicture?.length < 1 ? (
        <div className="w-8 h-8 p-1  font-bold text-lg rounded-full flex items-center justify-center bg-main text-white text-center">
          {user?.email?.substring(0, 1)}
        </div>
      ) : user?.role !== "company" && user?.user?.profilePicture?.length > 1 ? (
        <img
          class="w-8 h-8 rounded-full"
          src={user?.user?.profilePicture}
          alt="photo"
        />
      ) : user?.role === "company" && user?.user?.logo?.length > 1 ? (
        <img
          class="w-8 h-8 rounded-full"
          src={user?.role === "company" ? user?.user?.logo : ""}
          alt="user"
        />
      ) : (
        <div className="w-8 h-8 p-1 text-lg font-bold rounded-full flex items-center justify-center bg-main text-white text-center">
          {user?.email?.substring(0, 1)}
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
