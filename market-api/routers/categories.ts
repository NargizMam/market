import express from "express";
import Category from "../models/Category";

const categoriesRouters = express.Router();

categoriesRouters.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        return res.send(categories);
    } catch (e) {
        return next(e);
    }
});


export default categoriesRouters;