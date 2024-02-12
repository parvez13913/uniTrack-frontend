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

    // get all semesterRegistration
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

    // get single semesterRegistrations
    semesterRegistration: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SEMESTER_REGISTRATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.semesterRegistration],
    }),

    // update semesterRegistration
    updateSemesterRegistration: build.mutation({
      query: (data) => ({
        url: `${SEMESTER_REGISTRATION_URL}/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),

    // delete semesterRegistration
    deleteSemesterRegistration: build.mutation({
      query: (id) => ({
        url: `${SEMESTER_REGISTRATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),

    // my Registration
    myRegistration: build.query({
      query: () => ({
        url: `${SEMESTER_REGISTRATION_URL}/getMyRegistration`,
        method: "GET",
      }),
      providesTags: [tagTypes.semesterRegistration],
    }),

    // start Registration
    startRegistration: build.mutation({
      query: () => ({
        url: `${SEMESTER_REGISTRATION_URL}/startRegistration`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
    // get my semester courses
    mySemesterRegistrationCourses: build.query({
      query: () => ({
        url: `${SEMESTER_REGISTRATION_URL}/getMySemesterCourses`,
        method: "GET",
      }),
      providesTags: [tagTypes.semesterRegistration],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useSemesterRegistrationsQuery,
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
  useDeleteSemesterRegistrationMutation,
  useMyRegistrationQuery,
  useStartRegistrationMutation,
  useMySemesterRegistrationCoursesQuery,
} = semesterRegistrationApi;
