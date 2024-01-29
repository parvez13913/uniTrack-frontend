import { IBuilding, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BUILDING_URL = "/buildings";

export const buildingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post building
    addBuilding: build.mutation({
      query: (data) => ({
        url: BUILDING_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.building],
    }),
    // get buildings
    buildings: build.query({
      query: (arg: Record<string, any>) => ({
        url: BUILDING_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IBuilding[], meta: IMeta) => {
        return {
          buildings: response,
          meta,
        };
      },
      providesTags: [tagTypes.building],
    }),

    // delete building
    deleteBuilding: build.mutation({
      query: (id) => ({
        url: `${BUILDING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.building],
    }),
  }),
});

export const {
  useAddBuildingMutation,
  useBuildingsQuery,
  useDeleteBuildingMutation,
} = buildingApi;
