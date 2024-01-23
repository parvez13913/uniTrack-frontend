import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { IAcademicDepartment, IMeta } from "@/types";

const ACADEMIC_DEPARTMENT_URL = "/academicDepartments";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Academic Department
    addAcademicDepartment: build.mutation({
      query: (data) => ({
        url: ACADEMIC_DEPARTMENT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
    // get Academic Departments
    academicDepartments: build.query({
      query: (arg: Record<string, any>) => ({
        url: ACADEMIC_DEPARTMENT_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAcademicDepartment[], meta: IMeta) => {
        return {
          academicDepartments: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicDepartment],
    }),
  }),
});

export const { useAddAcademicDepartmentMutation, useAcademicDepartmentsQuery } =
  departmentApi;
