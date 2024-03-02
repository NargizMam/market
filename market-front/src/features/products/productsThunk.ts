import {InfoProps, ProductMutation} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";


export const createProduct = createAsyncThunk<null, InfoProps>(
    'products/create',
    async ({token, newProduct}) => {
        const formData = new FormData();

        const keys = Object.keys(newProduct) as (keyof ProductMutation)[];
        keys.forEach(key => {
            const value = newProduct[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });
        return axiosApi.post('/products', formData, {headers: {Authorization: `_bearer ${token}`}});
    }
);