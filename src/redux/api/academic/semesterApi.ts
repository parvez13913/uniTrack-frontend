import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { IAcademicSemester, IMeta } from "@/types";

const ACADEMIC_SEMESTER_URL = "/academicSemesters";

export const semesterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Academic Semester
    addAcademicSemester: build.mutation({
      query: (data) => ({
        url: ACADEMIC_SEMESTER_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.academicSemester],
    }),
    // get Academic Semester
    academicSemesters: build.query({
      query: (arg: Record<string, any>) => ({
        url: ACADEMIC_SEMESTER_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAcademicSemester[], meta: IMeta) => {
        return {
          academicSemesters: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicSemester],
    }),
    // get single Academic Semester
    academicSemester: build.query({
      query: (id) => ({
        url: `${ACADEMIC_SEMESTER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.academicSemester],
    }),
  }),
});

export const {
  useAddAcademicSemesterMutation,
  useAcademicSemestersQuery,
  useAcademicSemesterQuery,
} = semesterApi;
