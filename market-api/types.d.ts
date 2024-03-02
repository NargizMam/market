import { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
  displayName: string;
  phoneNumber: string;
}
export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
export type UserModel = Model<UserFields, {}, UserMethods>;
export interface ProductMutation {
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
  salesman: string;
}
export interface ApiProduct {
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
  user: {
    displayName: string;
    phoneNumber: string;
  };
}
