import {Grid, Typography} from "@mui/material";
import BottomAppBar from "../../components/BottomAppBar";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProducts, selectProductsLoading} from "./productsSlice.ts";
import ProductItem from "./components/ProductItem.tsx";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useEffect} from "react";
import {fetchProductsList} from "./productsThunk.ts";
import {useParams} from "react-router-dom";

const ProductsList = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const fetchLoading = useAppSelector(selectProductsLoading);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchProductsList());
    }, [dispatch]);


    return (
        <Grid container  direction="row">
            <Grid item sx={{margin: 'auto'}}>
                <Typography variant="h6">Выберите категорию товаров</Typography>
                <Grid >
                    <Grid  sx={{background: '#ccc'}}>
                        <BottomAppBar/>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={8}>
                <Typography variant="h6">Все товары</Typography>
                {fetchLoading && <Spinner/>}
                <Grid item container spacing={2}>
                    {products.map(product => (
                        <ProductItem
                            key={product._id}
                            title={product.title}
                            price={product.price}
                            id={product._id}
                            image={product.image}
                            salesman={product.salesman}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsList;


