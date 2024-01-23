import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { IAcademicFaculty, IMeta } from "@/types";

const ACADEMIC_FACULTY_URL = "/academicFaculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Academic faculty
    addAcademicFaculty: build.mutation({
      query: (data) => ({
        url: ACADEMIC_FACULTY_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    // get Academic Faculties
    academicFaculties: build.query({
      query: (arg: Record<string, any>) => ({
        url: ACADEMIC_FACULTY_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
        return {
          academicFaculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicFaculty],
    }),
  }),
});

export const { useAddAcademicFacultyMutation, useAcademicFacultiesQuery } =
  facultyApi;
