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
    baseUrl: "http://localhost:3001/etblink/app/v1",
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
    "news",
    "youtubes",
    "rates",
    "rate-multiple",
    "view",
    "save",
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

    //user forget
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgetPassword",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //user forget
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/user/sendEmail",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //user forget
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/user/resetPassword?resetToken=${data.resetToken}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //user forget
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/utility/updatePassword`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    //create
    create: builder.mutation({
      query: (data) => {
        let newUrl = "";
        let newTag;
        if (!data.url) {
          for (var key of data.entries()) {
            if (key[0] === "url") newUrl = key[1];
            if (key[0] === "tag") newTag = key[1].split(",");
          }
        } else {
          newTag = data.tag;
        }

        newTag.map((d) => tag.push(d));

        return {
          url: data.url ? data.url : newUrl,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),

    //   query: (data) => {
    //     data?.tag.map((d) => tag.push(d));
    //     // console.log(data.url, encrypt(data.url), "both");
    //     return {
    //       url: data.url,
    //       method: "POST",
    //       body: data,
    //       credentials: "include",
    //     };
    //   },
    //   invalidatesTags: () => {
    //     return [...new Set(tag)];
    //   },
    // }),

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
        let newUrl = "";
        let newTag;
        if (!data.url) {
          for (var key of data.entries()) {
            if (key[0] === "url") newUrl = key[1];
            if (key[0] === "tag") newTag = key[1].split(",");
          }
        } else {
          newTag = data.tag;
        }
        newTag.map((d) => tag.push(d));
        return {
          url: data.url ? data.url : newUrl,
          method: "PUT",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),

    // update: builder.mutation({
    //   query: (data) => {
    //     console.log(data, "api slice");
    //     // data?.tag.map((d) => tag.push(d));
    //     return {
    //       url: "/user/companies",
    //       method: "PUT",
    //       body: data,
    //       credentials: "include",
    //     };
    //   },
    //   invalidatesTags: ["company"],
    // }),
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

    //create rate
    createRate: builder.mutation({
      query: (data) => ({
        url: `/utility/rate`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["companies", "rate", "rate-multiple"],
    }),

    //create rate
    readRate: builder.query({
      query: (arg) => ({
        url: `/utility/rate?id=${arg.id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["companies", "rate", "rate-multiple"],
    }),

    //read rate multiple
    readMultipleRate: builder.query({
      query: () => ({
        url: `/utility/rateMultiple`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["companies", "rate", "rate-multiple"],
    }),

    //delete rate
    deleteRate: builder.mutation({
      query: (data) => ({
        url: `/utility/rate?id=${data.id}`,
        method: "DELETE",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["companies", "rate", "rate-multiple"],
    }),

    //create rate
    createSave: builder.mutation({
      query: (data) => ({
        url: `/utility/save`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["companies", "save"],
    }),

    //create rate
    createView: builder.mutation({
      query: (data) => ({
        url: `/utility/view`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["companies", "view"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useSendEmailMutation,

  useCreateMutation,
  useReadQuery,
  useUpdateMutation,
  useDeleteMutation,
  useLazyReadQuery,

  useLazyReadChatQuery,

  useCreateRateMutation,
  useReadRateQuery,
  useReadMultipleRateQuery,
  useDeleteRateMutation,

  useCreateSaveMutation,
  useCreateViewMutation,
} = apiSlice;
