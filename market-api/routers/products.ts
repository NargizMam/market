import {Router} from 'express';
import mongoose, {Types} from 'mongoose';
import {ApiProduct, ProductMutation} from '../types';
import {imagesUpload} from '../multer';
import Product from '../models/Product';
import auth, {RequestWithUser} from "../middleware/auth";
import User from "../models/User";

const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    if(req.query.category){
      const categoriesProducts = await Product.find({'category': req.query.category}).populate('category', 'title');
      return res.send(categoriesProducts);
    }
    const results = await Product.find();
    return res.send(results);
  } catch (e) {
    return next(e);
  }
});
productsRouter.get('/:id', auth,async (req: RequestWithUser, res) => {
  const user = req.user?._id;
  let userInfo;
  try {
    const productResult = await Product.findById(req.params.id).populate('category', 'title');
    if(productResult) {
      userInfo = await User.findOne({displayName: productResult.salesman}, 'displayName phone');
      if(userInfo && userInfo._id === user){
        const productInfo: ApiProduct = {
          title: productResult.title,
          description: productResult.description,
          image: productResult.image,
          price: productResult.price,
          category: productResult.title,
          user: {
            displayName: userInfo.displayName,
            phone: userInfo.phoneNumber
          }
        }
        return res.send(productResult);

      }

    }
    if (!productResult || !userInfo) {
      return res.sendStatus(404);
    }
  } catch {
    return res.sendStatus(500);
  }
});


productsRouter.post('/', auth,  imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  const displayName = req.user?.displayName;

  try {
    const productData: ProductMutation = {
      category: req.body.category,
      title: req.body.title,
      price: parseFloat(req.body.price),
      description: req.body.description,
      salesman: displayName!,
      image: req.file ? req.file.filename : null,
    };

    const product = new Product(productData);
    await product.save();

    res.send(product);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default productsRouter;