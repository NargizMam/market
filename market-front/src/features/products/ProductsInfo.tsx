import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Button, CardMedia, Grid, Paper, Typography} from '@mui/material';
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
            const infoForFetch = {
                id: id,
                token: user.token
            }
            dispatch(fetchOneProduct(infoForFetch));
        }
    }, [dispatch, id, user]);
    const deleteProduct = () => {
        // dispatch(deleteProduct(productsInfo.id));
    };

    if (productsInfo) {
        cardImage = apiURL + '/' + productsInfo.image;
        allProductInfo = (
            <Grid sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Paper sx={{width: '90%'}}>
                    <Typography variant="h4">{productsInfo.title}</Typography>
                    <CardMedia
                        component="img"
                        sx={{width: '30%'}}
                        src={cardImage} alt={productsInfo.title}/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Цена: {productsInfo?.price} сом
                    </Typography>
                    <Grid>
                        <Typography variant="body2">{productsInfo.description}</Typography>
                    </Grid>
                    <Grid columnSpacing={1} sx={{order: {xs: 1, sm: 2, marginTop: '10px', color: 'darkBlue'}}}>
                        <Typography variant="h6">Информация о продавце: </Typography>
                        <Typography variant="body1">{productsInfo.user.displayName}</Typography>
                        <Typography variant="body2">{productsInfo.user.phoneNumber}</Typography>
                    </Grid>
                    <Typography variant="body2">{productsInfo.category.title}</Typography>
                    {user?.username === productsInfo.user.displayName ?
                        (<Button onClick={deleteProduct}>Удалить</Button>) : null}
                </Paper>
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