import { IFaculty, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FACULTY_URL = "/faculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post faculty
    addFaculty: build.mutation({
      query: (data) => ({
        url: "/users/createFaculty",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),

    // get all faculties
    faculties: build.query({
      query: (arg: Record<string, any>) => ({
        url: FACULTY_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IFaculty[], meta: IMeta) => {
        return {
          faculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.faculty],
    }),
  }),
});

export const { useAddFacultyMutation, useFacultiesQuery } = facultyApi;
