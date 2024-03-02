import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from './categoriesThunk';
import {CategoryApi} from "../../types";
import {RootState} from "../../app/store";

interface CategoriesState {
    categories: CategoryApi[];
    fetching: boolean;
}
const initialState: CategoriesState = {
    categories: [],
    fetching: false
}
export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.fetching = true;
        }).addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
            state.fetching = false;
            state.categories = categories;
        }).addCase(fetchCategories.rejected, state => {
            state.fetching = false;
        })
    }});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesFetching = (state: RootState) => state.categories.fetching;
