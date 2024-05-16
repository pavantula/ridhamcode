import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: baseQuery,
    tagTypes: ['products-apis'],
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: (data) => ({
                method: 'POST',
                url: `crm/clinic-get-all-patient`,
                body: data
            }),
            providesTags: ['products-apis']
        }),

        // getPatientDetail: build.query({
        //     query: (data) => ({
        //         method: 'POST',
        //         url: `crm/clinic-get-all-patient`,
        //         body: data
        //     }),
        //     providesTags: ['crm-patient']
        // }),

        // updatePatient: build.mutation<Response, FormData>({
        //     query: (data) => ({
        //         method: 'POST',
        //         url: `crm/add-update-patient`,
        //         body: data
        //     }),
        //     invalidatesTags: ['crm-patient']
       // }),

    }),
})

export const {
    useGetAllPatientsQuery,
    // useGetPatientDetailQuery,
    // useUpdatePatientMutation
} = productsAPI