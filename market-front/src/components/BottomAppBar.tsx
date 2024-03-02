import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import {NavLink, useNavigate} from "react-router-dom";
import {CATEGORIES as categories} from './../constants.ts'

const BottomAppBar = () => {
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const categoriesFetching = useAppSelector(selectCategoriesFetching);

    // useEffect(() => {
    //     dispatch(fetchCategories());
    // }, [dispatch])
    const showCategoriesProduct = (id: string) =>{
        navigate('/products/'+ id);
    };

    return (
        <>
            {/*{categoriesFetching ? <Spinner/> : null}*/}
            <Paper  sx={{ pb: '50px' }}>
                <List sx={{ mb: 2 }}>
                    <ListSubheader sx={{ bgcolor: 'background.paper' }}
                                   component={NavLink} to={'/'}

                    >All items
                    </ListSubheader>
                    {categories.map(category => (
                        <React.Fragment key={category}>
                            <ListSubheader
                                sx={{ bgcolor: 'background.paper', textDecoration: "underline" }}
                                onClick={()=> showCategoriesProduct(category)}
                            >
                                {category.toUpperCase()}
                            </ListSubheader>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </>
    );
};

export default BottomAppBar;