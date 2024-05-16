// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from "../store/store";


export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://krushi.synverse.com/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).token

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `${token}`)
        }

        return headers
    },
})