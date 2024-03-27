import { ICourse, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COURSE_URL = "/courses";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post course
    addCourse: build.mutation({
      query: (data) => ({
        url: COURSE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    // get courses
    courses: build.query({
      query: (arg: Record<string, any>) => ({
        url: COURSE_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ICourse[], meta: IMeta) => {
        return {
          courses: response,
          meta,
        };
      },
      providesTags: [tagTypes.course],
    }),

    // get single
    course: build.query({
      query: (id: string) => ({
        url: `${COURSE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.course],
    }),

    // delete course
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `${COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useCoursesQuery,
  useCourseQuery,
  useDeleteCourseMutation,
} = courseApi;
