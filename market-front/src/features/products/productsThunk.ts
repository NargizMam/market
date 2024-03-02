import {InfoForFetch, InfoProps, Product, ProductMutation} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

export const fetchProductsList = createAsyncThunk<Product[], string|null>(
    'products/fetchAll',
    async (categoryId) => {
        if(categoryId){
            const responseCP = await axiosApi.get<Product[]>(`/products?category=${categoryId}`);
            return responseCP.data;
        }
        const response = await axiosApi.get<Product[]>('/products');
        return response.data;
    }
);
export const fetchOneProduct= createAsyncThunk<Product, InfoForFetch>(
    'products/fetchOne',
    async ({id, token}) => {
        const response = await axiosApi.get('/products/' + id, {headers: {Authorization: `_bearer ${token}`}});
        const productsInfo = response.data;
        if (productsInfo === null) {
            throw  new Error('Not found');
        }
        return productsInfo;
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
