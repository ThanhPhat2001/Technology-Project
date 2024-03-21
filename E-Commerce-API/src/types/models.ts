import { ObjectId, Date } from "mongoose";

export interface ICategory {
  id: ObjectId,
  category_name: string;
  description: string;
  slug: string;
}

export interface IBrand {
  id: ObjectId,
  brand_name: string,
  description: string,
  slug: string
}

export interface IEmployee {
  id: ObjectId,
  firstName: string;
  lastName: string;
  fullName:string
  email: string;
  phoneNumber: string;
  address: string;
  birthDay: Date;
  password: string;
  photo: string;
  role: string;
  active: boolean;
}

export interface ICustomer {
  id: ObjectId,
  firstName: string;
  lastName: string;
  fullName:string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string
  birthDay: Date;
  password: string;
  photo: string;
  zip_code: number
}

export interface IProduct {
  id: ObjectId,
  product_name: string,
  slug: string,
  price: number,
  discount: number,
  categoryId: ObjectId,
  brandId: ObjectId,
  description: string,
  stock: number,
  thumbnail: string
}