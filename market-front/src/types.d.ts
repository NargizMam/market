
export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}
export interface LoginMutation {
  username: string;
  password: string;
}
export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  phoneNumber: string;
}
export interface ValidationError {
  errors: {
    [key: string]:{
      name: string;
      message: string
    }
  },
  message: string;
  name: string;
  _message: string;
}
export interface RegisterResponse {
  message: string,
  user: User
}
export interface GlobalError {
  error: string
}
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string ;
  category: Category;
  salesman: string;
}
export interface ProductMutation {
  title: string;
  category: string;
  description: string;
  image: string | null;
  price: string;
  salesman: string;
}
export interface InfoProps {
  newProduct: ProductMutation
  token: string;
}