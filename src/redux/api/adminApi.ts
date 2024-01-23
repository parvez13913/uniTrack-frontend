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
    // get single admin
    admin: build.query({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    // update admin
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useAdminsQuery,
  useAdminQuery,
  useUpdateAdminMutation,
} = adminApi;
