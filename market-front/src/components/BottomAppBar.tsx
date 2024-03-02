import {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import {NavLink} from "react-router-dom";
import {selectCategories, selectCategoriesFetching} from '../features/categories/categoriesSlice.ts';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import Spinner from './Spinner/Spinner.tsx';
import {fetchCategories} from "../features/categories/categoriesThunk.ts";
import {ListItem, ListItemButton, ListItemText} from "@mui/material";

const BottomAppBar = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoriesFetching = useAppSelector(selectCategoriesFetching);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    return (
        <>
            {categoriesFetching ? <Spinner/> : null}
            <Paper  sx={{ pb: '50px' }}>
                <List sx={{ mb: 2 }}>
                    <ListItemButton sx={{ bgcolor: 'background.paper' }}
                                   component={NavLink} to={'/'}

                    >ALL ITEMS
                    </ListItemButton>
                        <nav aria-label="secondary mailbox folders">
                            {categories.map(category => (
                                <ListItem disablePadding key={category._id}>
                                    <ListItemButton component={NavLink} to={`/products/${category._id}`}>
                                        <ListItemText primary={category.title.toUpperCase()} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </nav>

                </List>
            </Paper>
        </>
    );
};

export default BottomAppBar;