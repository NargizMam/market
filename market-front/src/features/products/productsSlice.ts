import {Product} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createProduct, deleteProduct, fetchOneProduct, fetchProductsList} from "./productsThunk.ts";

interface ProductsState {
    items: Product[];
    fetchLoading: boolean;
    createLoading: boolean;
    oneProduct: Product | null;
    oneFetching: boolean;
    deleting: boolean;

}

const initialState: ProductsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    oneProduct: null,
    oneFetching: false,
    deleting: false,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsList.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchProductsList.fulfilled, (state, {payload: products}) => {
            state.fetchLoading = false;
            state.items = products;
        });
        builder.addCase(fetchProductsList.rejected, state => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchOneProduct.pending, (state) => {
            state.oneFetching = true;
        });
        builder.addCase(fetchOneProduct.fulfilled, (state, {payload: post}) => {
            state.oneFetching = false;
            state.oneProduct = post;
        });
        builder.addCase(fetchOneProduct.rejected, (state) => {
            state.oneFetching = false;
        });
        builder.addCase(createProduct.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createProduct.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createProduct.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.deleting = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.deleting = false;
        });
        builder.addCase(deleteProduct.rejected, (state) => {
            state.deleting = false;
        });
    },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductCreating = (state: RootState) => state.products.createLoading;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectOneProduct= (state: RootState) => state.products.oneProduct;
export const selectOneProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectDeleting = (state: RootState) => state.products.deleting;