import {Schema, model, Types} from 'mongoose';

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type:String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type:String,
    required: true
  },
  category: {
    type: String,
    enum: ['computers', 'things', 'toys', 'equipment', 'another'],
    default: 'another',
  }
});

const Product = model('Product', ProductSchema);

export default Product;