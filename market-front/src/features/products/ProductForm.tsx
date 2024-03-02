import React, {useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from '@mui/material';
import {useAppDispatch} from '../../app/hooks';
import {ProductMutation} from "../../types";
import FileInput from '../../components/FileInput/FileInput';



const ProductForm = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState<ProductMutation>({
        category: '',
        title: '',
        price: 0,
        description: '',
        image: null,
    });

    useEffect(() => {
    }, [dispatch]);

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(state)
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

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
            style={{width: '70%'}}
        >
            <Grid container direction="column" spacing={2}>
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
                        {/*{categories.map(category => (*/}
                        {/*    <MenuItem key={category._id} value={category._id}>*/}
                        {/*        {category.title}*/}
                        {/*    </MenuItem>*/}
                        {/*))}*/}
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
                        onChange={inputChangeHandler}
                        name="description"
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        id="price" label="Price"
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
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;
