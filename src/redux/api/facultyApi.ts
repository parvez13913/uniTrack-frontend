import { ICoreFaculty, IFaculty, IFacultyCourse, IMeta } from "@/types";
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

    // Get single faculty
    faculty: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FACULTY_URL}/profile/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faculty],
    }),

    // Update faculty
    updateFaculty: build.mutation({
      query: (data) => ({
        url: `${FACULTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faculty],
    }),

    // delete faculty
    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `${FACULTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),

    // Get faculty course
    facultyCourses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${FACULTY_URL}/myCourses`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFacultyCourse[], meta: IMeta) => {
        return {
          myCourses: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),

    //get faculty Course Students
    facultyCourseStudents: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${FACULTY_URL}/myCourseStudents`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICoreFaculty[], meta: IMeta) => {
        return {
          myCourseStudents: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useAddFacultyMutation,
  useFacultiesQuery,
  useFacultyQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useFacultyCoursesQuery,
  useFacultyCourseStudentsQuery,
} = facultyApi;
