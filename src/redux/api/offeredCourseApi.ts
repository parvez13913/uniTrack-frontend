import { IMeta, IOfferedCourse } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const OFFERED_COURSE_URL = "/offeredCourses";

export const offeredCourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post offeredCourse
    addOfferedCourse: build.mutation({
      query: (data) => ({
        url: OFFERED_COURSE_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),

    // get offeredCourses
    offeredCourses: build.query({
      query: (arg: Record<string, any>) => ({
        url: OFFERED_COURSE_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IOfferedCourse[], meta: IMeta) => {
        return {
          offeredCourses: response,
          meta,
        };
      },
      providesTags: [tagTypes.offeredCourse],
    }),

    // delete offeredCourse
    deleteOfferedCourse: build.mutation({
      query: (id) => ({
        url: `${OFFERED_COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),
  }),
});

export const {
  useAddOfferedCourseMutation,
  useOfferedCoursesQuery,
  useDeleteOfferedCourseMutation,
} = offeredCourseApi;
