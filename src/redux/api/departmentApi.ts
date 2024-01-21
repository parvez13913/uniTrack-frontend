import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const MANAGEMENT_DEPARTMENT_URL = "/managementDepartments";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDepartment: build.mutation({
      query: (data) => ({
        url: MANAGEMENT_DEPARTMENT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.department],
    }),
  }),
});

export const { useAddDepartmentMutation } = departmentApi;
