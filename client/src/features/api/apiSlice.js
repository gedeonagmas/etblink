import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authorization = {
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
};

let tag = [];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.100.12:5000/jms/app/v1/user",
  }),
  tagTypes: ["categories", "cases"],
  endpoints: (builder) => ({
    //user signup
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),

    //user login
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-users"],
    }),

    //create
    create: builder.mutation({
      query: (data) => {
        data?.tag.map((d) => tag.push(d));
        return {
          url: data.url,
          method: "POST",
          body: data,
          headers: authorization,
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
          headers: authorization,
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
          headers: authorization,
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
          headers: authorization,
        };
      },
      invalidatesTags: () => {
        return [...new Set(tag)];
      },
    }),
  
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useCreateMutation,
  useReadQuery,
  useUpdateMutation,
  useDeleteMutation,
} = apiSlice;
