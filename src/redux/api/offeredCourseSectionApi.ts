import { IMeta, IOfferedCourseSection } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const OFFERED_COURSE_SECTION_URL = "/offeredCoursesSections";

export const offeredCourseSectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post offered Course Section
    addOfferedCourseSection: build.mutation({
      query: (data) => ({
        url: OFFERED_COURSE_SECTION_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.offeredCourseSection],
    }),

    // get offered Course Section
    offeredCoursesSections: build.query({
      query: (arg: Record<string, any>) => ({
        url: OFFERED_COURSE_SECTION_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IOfferedCourseSection[], meta: IMeta) => {
        return {
          offeredCoursesSections: response,
          meta,
        };
      },
      providesTags: [tagTypes.offeredCourseSection],
    }),

    // delete offered Course Section
    deleteOfferedCourseSection: build.mutation({
      query: (id) => ({
        url: `${OFFERED_COURSE_SECTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.offeredCourseSection],
    }),
  }),
});

export const {
  useAddOfferedCourseSectionMutation,
  useOfferedCoursesSectionsQuery,
  useDeleteOfferedCourseSectionMutation,
} = offeredCourseSectionApi;
