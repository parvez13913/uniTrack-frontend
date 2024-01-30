import { IMeta, ISemesterRegistration } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const SEMESTER_REGISTRATION_URL = "/semesterRegistrations";

export const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post semesterRegistration
    addSemesterRegistration: build.mutation({
      query: (data) => ({
        url: SEMESTER_REGISTRATION_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),

    // get all semesterRegistrations
    semesterRegistrations: build.query({
      query: (arg: Record<string, any>) => ({
        url: SEMESTER_REGISTRATION_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ISemesterRegistration[], meta: IMeta) => {
        return {
          semesterRegistrations: response,
          meta,
        };
      },
      providesTags: [tagTypes.semesterRegistration],
    }),

    // delete semesterRegistration
    deleteSemesterRegistration: build.mutation({
      query: (id) => ({
        url: `${SEMESTER_REGISTRATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useSemesterRegistrationsQuery,
  useDeleteSemesterRegistrationMutation,
} = semesterRegistrationApi;