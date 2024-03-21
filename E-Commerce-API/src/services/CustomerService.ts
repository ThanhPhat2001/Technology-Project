import Customer from "../models/database/CustomerModel";
import { ICustomer } from "../types/models";

const getAllCustomers = async (page: number, limit: number) => {
  const customers = await Customer.find()
  .select('-__v')
  .skip((page - 1) * limit)
  .limit(limit);
  const totalRecords = await Customer.countDocuments();
  
  return {
    customers,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit,
  };
};

const getCustomerById = async (id: string) => {
  console.log(id);
  const customerGetById = await Customer.findById(id);
  return customerGetById;
};

const createCustomer = async (payload: ICustomer) => {
  const newCustomer = await Customer.create(payload);
  return newCustomer;
};

const updateCustomer = async (id: string, payload: ICustomer) => {
  const updateCustomer = Customer.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updateCustomer;
};

const deleteCustomer = async (id: string) => {
  const deleteCustomer = Customer.findByIdAndDelete(id);
  return deleteCustomer;
};

export default {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
