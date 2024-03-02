import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    enum: ['computers', 'things', 'toys', 'equipment', 'another'],
    default: 'another',
  },
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
