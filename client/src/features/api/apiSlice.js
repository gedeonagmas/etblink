import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import CryptoJS from "crypto-js";

// const authorization = {
//   authorization: `Bearer ${localStorage.getItem("jwt")}`,
// };

// const encrypt = (data) => {
//   const ENC = "bf3c199c2470cb477d907b1e0917c17f";
//   const IV = "5183666c72eec9e4";
//   const ALGO = "aes-256-cbc";

//   let cipher = crypto.createCipheriv(ALGO, ENC, IV);
//   let encrypted = cipher.update(data.split("?")[1], "utf8", "base64");
//   encrypted += cipher.final("base64");

//   const cc = data.split("?")[0].split("/").splice(1, 2).join("/");
//   // const dd = CryptoJS.AES.encrypt(data.split("?")[1], "gedi");
//   // console.log(data, "data", data.split("?")[1], "split", dd, "encrypted self");
//   // const bb = CryptoJS.AES.decrypt(dd, "food").toString(CryptoJS.enc.Utf8);
//   return `${cc}?q=${encrypted}`;
// };

let tag = [];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/etblink/app/v1",
  }),
  tagTypes: [
    "users",
    "institutions",
    "permissions",
    "cases",
    "categories",
    "applications",
    "payments",
    "case-managers",
    "lawyers",
    "groups",
    "chats",
  ],
  endpoints: (builder) => ({
    //user signup
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //user login
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["get-all-users"],
    }),

    //user logout
    userLogout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    //create
    create: builder.mutation({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        // console.log(data.url, encrypt(data.url), "both");
        return {
          url: data.url,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //read
    read: builder.query({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        return {
          url: data.url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //update
    update: builder.mutation({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        return {
          url: data.url,
          method: "PUT",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //delete
    delete: builder.mutation({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        return {
          url: data.url,
          method: "DELETE",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //########################### chat routing ###############################
    readChat: builder.query({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        return {
          url: data.url,
          method: "GET",
          // headers: authorization,
        };
      },
      providesTags: () => {
        return [...new Set(tag)];
      },
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,

  useCreateMutation,
  useReadQuery,
  useUpdateMutation,
  useDeleteMutation,

  useLazyReadChatQuery,
} = apiSlice;
