import { IMeta, IRoom } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const ROOM_URL = "/rooms";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // post room
    addRoom: build.mutation({
      query: (data) => ({
        url: ROOM_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.room],
    }),
    // get rooms
    rooms: build.query({
      query: (arg: Record<string, any>) => ({
        url: ROOM_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IRoom[], meta: IMeta) => {
        return {
          rooms: response,
          meta,
        };
      },
      providesTags: [tagTypes.room],
    }),

    // delete room
    deleteRoom: build.mutation({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.room],
    }),
  }),
});
