import {Grid, Typography} from "@mui/material";
import BottomAppBar from "../../components/BottomAppBar";

const ProductsList = () => {
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

            <Grid xs={8}>
                <Typography variant="h6">Все товары</Typography>
            </Grid>
        </Grid>
    );
};

export default ProductsList;