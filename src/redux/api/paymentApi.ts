import { IMeta, IRoom } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const BASE_STUDENT_SEMESTER_PAYMENT = "/studentSemesterPayments";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myPayments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BASE_STUDENT_SEMESTER_PAYMENT}/mySemesterPayments`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IRoom[], meta: IMeta) => {
        return {
          myPayments: response,
          meta,
        };
      },
      providesTags: [tagTypes.payment],
    }),
    initialPayment: build.mutation({
      query: (data: any) => ({
        url: `${BASE_STUDENT_SEMESTER_PAYMENT}/initiatePayment`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useMyPaymentsQuery, useInitialPaymentMutation } = paymentApi;

export default paymentApi;