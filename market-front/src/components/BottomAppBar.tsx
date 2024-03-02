import {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import {NavLink, useNavigate} from "react-router-dom";
import {selectCategories, selectCategoriesFetching} from '../features/categories/categoriesSlice.ts';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import Spinner from './Spinner/Spinner.tsx';
import {fetchCategories} from "../features/categories/categoriesThunk.ts";
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import {fetchProductsList} from "../features/products/productsThunk.ts";

const BottomAppBar = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoriesFetching = useAppSelector(selectCategoriesFetching);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const getCategoriesProducts = (title: string) => {
        const selectedCategory = categories.find(category => title === category.title);
        if(selectedCategory){
            dispatch(fetchProductsList(selectedCategory._id))
            navigate(`/?category=${selectedCategory.title}`);
        }
    };

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
                                    <ListItemButton onClick={() => getCategoriesProducts(category.title)}>
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