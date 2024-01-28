import { IMeta, IStudent } from "@/types";
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
  }),
});

export const { useAddStudentMutation, useStudentsQuery } = studentApi;
