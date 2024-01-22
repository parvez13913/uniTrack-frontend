import { IAdmin, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admins";
export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post admin
    addAdmin: build.mutation({
      query: (data) => ({
        url: "/users/createAdmin",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    // get all admins
    admins: build.query({
      query: (arg: Record<string, any>) => ({
        url: ADMIN_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAdmin[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
  }),
});

export const { useAddAdminMutation, useAdminsQuery } = adminApi;
