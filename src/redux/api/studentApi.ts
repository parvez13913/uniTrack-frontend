import { IMeta, IMyCourse, IStudent } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const STUDENT_URL = "/students";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post Student
    addStudent: build.mutation({
      query: (data) => ({
        url: "/users/createStudent",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.student],
    }),
    // get all students
    students: build.query({
      query: (arg: Record<string, any>) => ({
        url: STUDENT_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IStudent[], meta: IMeta) => {
        return {
          students: response,
          meta,
        };
      },
      providesTags: [tagTypes.faculty],
    }),

    // get single student
    student: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),

    // update student
    updateStudent: build.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.student],
    }),

    // delete student
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.student],
    }),
    // My Course
    myCourses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${STUDENT_URL}/my-courses`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IMyCourse[], meta: IMeta) => {
        return {
          myCourses: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useStudentsQuery,
  useStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useMyCoursesQuery,
} = studentApi;
