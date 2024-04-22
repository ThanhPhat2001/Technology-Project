import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess } from "../helpers/responseHandler";
import customerService from "../services/CustomerService";
import {CustomerRespone} from "../models/response/CustomerResponse";
import Customer from "../models/response/Customer";

const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    const customerGetAll = await customerService.getAllCustomers(page, limit);
    console.log("customerGetAll", customerGetAll);

    const customers =  customerGetAll.customers.map((customer) => {
      return new Customer(
        customer.id,
        customer.firstName,
        customer.lastName,
        customer.fullName,
        customer.email,
        customer.phoneNumber,
        customer.street,
        customer.city,
        customer.state,
        customer.birthDay,
        customer.avatar,
        customer.zip_code
      );
    });

    const customerResponse = new CustomerRespone(
        customerGetAll.totalRecords,
        customerGetAll.totalPages,
        customerGetAll.currentPage,
        customerGetAll.recordsPerPage,
        customers
    )

    sendJsonSuccess(res)(customerResponse);
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerGetById = await customerService.getCustomerById(req.params.id);

    if (customerGetById === null) {
      return res.status(404).json({ message: "employee not found" });
    }

    const customer = new Customer(
        customerGetById.id,
        customerGetById.firstName,
        customerGetById.lastName,
        customerGetById.fullName,
        customerGetById.email,
        customerGetById.phoneNumber,
        customerGetById.street,
        customerGetById.city,
        customerGetById.state,
        customerGetById.birthDay,
        customerGetById.avatar,
        customerGetById.zip_code
    );

    sendJsonSuccess(res)(customer);

  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newEmployee = await customerService.createCustomer(payload);
    sendJsonSuccess(res)(newEmployee);
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedEmployee = await customerService.updateCustomer(id, payload);
    sendJsonSuccess(res)(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await customerService.deleteCustomer(id);
    sendJsonSuccess(res)(deletedEmployee);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
