import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import {NavLink, useNavigate} from "react-router-dom";
import {selectCategories, selectCategoriesFetching} from '../features/categories/categoriesSlice.ts';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import Spinner from './Spinner/Spinner.tsx';
import {useEffect} from "react";
import {fetchCategories} from "../features/categories/categoriesThunk.ts";

const BottomAppBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categories = useAppSelector(selectCategories);
    const categoriesFetching = useAppSelector(selectCategoriesFetching);
    console.log(categories)
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const showCategoriesProduct = (id: string) =>{
        navigate('/products/'+ id);
    };

    return (
        <>
            {categoriesFetching ? <Spinner/> : null}
            <Paper  sx={{ pb: '50px' }}>
                <List sx={{ mb: 2 }}>
                    <ListSubheader sx={{ bgcolor: 'background.paper' }}
                                   component={NavLink} to={'/'}

                    >All items
                    </ListSubheader>
                    {categories.map(category => (
                        <React.Fragment key={category._id}>
                            <ListSubheader
                                sx={{ bgcolor: 'background.paper', textDecoration: "underline" }}
                                onClick={()=> showCategoriesProduct(category._id)}
                            >
                                {category.title.toUpperCase()}
                            </ListSubheader>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </>
    );
};

export default BottomAppBar;