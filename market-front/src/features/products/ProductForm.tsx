import React, {useEffect, useState} from 'react';
import {Alert, Grid, MenuItem, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ProductMutation} from "../../types";
import FileInput from '../../components/FileInput/FileInput';
import {createProduct} from "./productsThunk.ts";
import {selectUser} from "../users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import {selectProductCreating} from "./productsSlice.ts";
import { LoadingButton } from '@mui/lab';
import {selectCategories} from "../categories/categoriesSlice.ts";
import {fetchCategories} from "../categories/categoriesThunk.ts";

const initialState = {
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
}

const ProductForm = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const creating = useAppSelector(selectProductCreating);
    const categories = useAppSelector(selectCategories);

    const [state, setState] = useState<ProductMutation>(initialState);

    useEffect(() => {
        dispatch(fetchCategories());
        if(!user){
            navigate('/');
        }
    }, [dispatch, navigate, user]);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if(user){
        const infoProps = {
            token: user.token,
            newProduct: state
        }
        await dispatch(createProduct(infoProps)).unwrap();
        setState(initialState);
        navigate('/');
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };
    //валидация
    const isFormValid = () => {
        return (state.image !== null || state.description !== '' || state.price !== '' || state.title !== '' || state.category !== '');

    };
    return (
        <Grid sx={{maxWidth: '50%', margin: 'auto'}}>
            <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                {!isFormValid() ? (<Alert sx={{mb:2}}>Все поля обязательны к заполнению</Alert>) : null}
                <Grid container direction="column" spacing={3}>
                    <Grid item xs>
                        <TextField
                            select
                            id="category" label="Category"
                            value={state.category}
                            onChange={inputChangeHandler}
                            name="category"
                            required
                        >
                            <MenuItem value="" disabled>Please select a category</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category._id}
                                          title={category.title}
                                          value={category._id}
                                >
                                    {category.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="title" label="Title"
                            value={state.title}
                            onChange={inputChangeHandler}
                            name="title"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            multiline rows={3}
                            id="description" label="Description"
                            value={state.description}
                            required
                            onChange={inputChangeHandler}
                            name="description"
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="price"
                            label="Price"
                            type="number"
                            value={state.price}
                            onChange={inputChangeHandler}
                            name="price"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <FileInput
                            label="Image"
                            name="image"
                            onChange={fileInputChangeHandler}
                        />
                    </Grid>

                    <Grid item xs>
                        <LoadingButton
                            loading={creating}
                            disabled={!isFormValid()}
                            type="submit"
                            color="primary"
                            variant="contained"
                        >Create</LoadingButton>

                    </Grid>
                </Grid>
            </form>
        </Grid>

    );
};

export default ProductForm;
