import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from "../../axiosApi";
import { CategoryApi} from "../../types";

export const fetchCategories = createAsyncThunk<CategoryApi[]>(
    'categories/fetchAll',
    async () => {
        const response = await axiosApi.get<CategoryApi[]>('/categories');
        return response.data;
    }
);

