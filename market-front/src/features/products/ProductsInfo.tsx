import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {apiURL} from "../../constants";
import {selectOneProduct, selectOneProductsLoading} from "./productsSlice";
import {fetchOneProduct} from "./productsThunk.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {selectUser} from "../users/usersSlice.ts";

export const ProductsInfo = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const productsInfo = useAppSelector(selectOneProduct);
    const productsInfoLoading = useAppSelector(selectOneProductsLoading);
    const user = useAppSelector(selectUser);

    let cardImage;
    let allProductInfo;

    useEffect(() => {
        if (id && user) {
            const infoForFetch ={
                id: id,
                token: user.token
            }
            dispatch(fetchOneProduct(infoForFetch));
        }
    }, [dispatch, id, user]);

    if (productsInfo) {
        cardImage = apiURL + '/' + productsInfo.image;
        allProductInfo = (
            <Grid sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Card sx={{display: 'flex', width: '80%'}}>
                    <Box sx={{display: 'flex'}}>
                        <CardMedia
                            component="img"
                            sx={{width: 151}}
                            src={cardImage} alt={productsInfo.title}/>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                                {productsInfo?.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {productsInfo?.price}
                            </Typography>
                            <Typography variant="body2">{productsInfo.title}</Typography>
                            <Typography variant="body2">{productsInfo.user.displayName}</Typography>
                            <Typography variant="body2">{productsInfo.description}</Typography>
                            <Typography variant="body2">{productsInfo.category.title}</Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Grid>)
    }

    return (
        <>
            {productsInfoLoading && <Spinner/>}
                <Grid item sm md={6} lg={4}>
                    {allProductInfo}
                </Grid>

        </>
    );
};

export default ProductsInfo;