import { ObjectId, Date } from "mongoose";


export enum EnumOrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
  PrepareShipping = 'prepareShipping',
  Shipping = 'shipping',
  CancelShipping = 'cancelShipping',
  Shipped = 'shipped',
  PendingPaid = 'pendingPaid',
  Paid = 'paid',
  Refund = 'refund',
  Finished = 'finished'
}

export enum EnumPayments {
  Cash = 'CASH',
  Credit = 'CREDIT CARD',
  Cod = 'COD'
}

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
  avatar: string;
  role: string;
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
  avatar: string;
  zip_code: number
}

export interface IProduct {
  id: ObjectId,
  product_name: string
  slug: string,
  price: number,
  salePrice: number,
  discount: number,
  categoryId: ObjectId,
  brandId: ObjectId,
  description: string,
  stock: number,
  images?: string[];
}

export interface IOrder {
  id: ObjectId,
  fullName: string,
  email: string,
  phoneNumber: string
  orderStatus: EnumOrderStatus,
  orderDate: Date,
  shippingDate: Date,
  orderNote: string,
  shippingStreet: string,
  shippingCity: string,
  shippingState: string,
  paymentType: EnumPayments,
  totalPrice: number,
  orderDetail: IOderDetail[]
}

export interface IOderDetail  {
  product: ObjectId;
  quantity: number;
  totalPrice: number;
}