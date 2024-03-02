import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import {useAppSelector} from "../../../app/hooks";
import {selectUser} from "../../users/usersSlice";
import {apiURL} from "../../../constants";
import {useNavigate} from "react-router-dom";


interface Props {
    title: string;
    price: number;
    id: string;
    image: string;
    salesman: string;
}

const ProductItem: React.FC<Props> = ({title, price, id, image, salesman}) => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    if(image){
        image = apiURL + '/' + image;
    }
    const getProductInfo = () => {
        navigate('/products/' + id);
    };
    return (
        <Card sx={{width: 170, margin: 3}} onClick={getProductInfo}>
            <CardMedia
                sx={{height: 140}}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {price} сом
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {salesman}
                </Typography>
            </CardContent>
            {user ?
                (<CardActions>
                    <Button size="small">Продано</Button>
                </CardActions>) : null}

        </Card>
    );
};

export default ProductItem;