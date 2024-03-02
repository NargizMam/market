import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {apiURL} from "../../constants";
import {selectUser} from "../users/usersSlice";
import {selectOneProduct, selectOneProductsLoading} from "./productsSlice";

export const ProductsInfo = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const productsInfo = useAppSelector(selectOneProduct);
    const productsInfoLoading = useAppSelector(selectOneProductsLoading);
    const user = useAppSelector(selectUser);


    if (productsInfo?.image) {
        productsInfo.image = apiURL + '/' + productsInfo.image;
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchOneProduct(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {productsInfoLoading ? <Spinner/> : (
                <Grid sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Card sx={{display: 'flex', width: 800}}>
                        <Box sx={{display: 'flex'}}>
                            <CardMedia
                                component="img"
                                sx={{width: 151}}
                                src={productsInfo?.image} alt={productsInfo?.title}/>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography component="div" variant="h5">
                                    {productsInfo?.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {productsInfo?.price}
                                </Typography>
                                <Typography variant="body2">{productsInfo?.description}</Typography>
                                {/*<Typography variant="body2">{productsInfo?.user.displayName}</Typography>*/}
                                <Typography variant="body2">{productsInfo?.description}</Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Grid>)}

        </>
    );
};

export default ProductsInfo;