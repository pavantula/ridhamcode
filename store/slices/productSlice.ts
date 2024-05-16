import { ProductState } from '../../interfaces/slices/product'
import { createSlice } from '@reduxjs/toolkit'


const initialState: ProductState = {
    products: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getAllProductsInState: (state, action) => {
            return {
                ...state,
                products: action.payload
            }
        },
    },
})

export const {
    getAllProductsInState
} = productSlice.actions