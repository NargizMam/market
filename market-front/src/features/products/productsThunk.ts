import {ProductMutation} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

export const createProduct = createAsyncThunk<null, ProductMutation>(
    'dishes/create',
    async (productMutation) => {
        const formData = new FormData();

        const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
        keys.forEach(key => {
            const value = productMutation[key];

            if (value !== null) {
                formData.append(key, value.toString());
            }
        });

        return axiosApi.post('/products', formData);
    }
);