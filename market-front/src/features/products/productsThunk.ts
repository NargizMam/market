import {InfoProps, Product, ProductMutation} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

export const fetchProductsList = createAsyncThunk<Product[]>(
    'products/fetchAll',
    async () => {
        const response = await axiosApi.get<Product[]>('/products');
        return response.data;
    }
);
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