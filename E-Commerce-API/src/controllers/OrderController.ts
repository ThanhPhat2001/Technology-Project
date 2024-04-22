import { NextFunction, Request, Response } from "express";
import ordersService from "../services/OrderService";
import { sendJsonSuccess } from "../helpers/responseHandler";
import { IOrder } from "../types/models";
import Order from "../models/response/Order";
import { OrderRespone } from "../models/response/OrderResponse";

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

  try {
    const orderGetAll = await ordersService.getAllOrders(page, limit);

    const orders = orderGetAll.orders.map((order: any) => {
      return new Order(
        order.id,
        order.fullName,
        order.email,
        order.phoneNumber,
        order.orderStatus,
        order.orderDate,
        order.shippingDate,
        order.orderNote,
        order.shippingStreet,
        order.shippingCity,
        order.shippingState,
        order.paymentType,
        order.totalPrice,
        order.orderDetail
      );
    });

    const orderRespone = new OrderRespone(
      orderGetAll.totalRecords,
      orderGetAll.totalPages,
      orderGetAll.currentPage,
      orderGetAll.recordsPerPage,
      orders
    );
    sendJsonSuccess(res)(orderRespone);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await ordersService.getOrderById(id);
    sendJsonSuccess(res)(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: IOrder = req.body;
    const newOrder = await ordersService.createOrder(payload);
    sendJsonSuccess(res)(newOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * Cập nhật một đơn hàng bằng ID
 */
const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload: IOrder = req.body;
    const uodateOrder = await ordersService.updateOrder(id, payload);
    sendJsonSuccess(res)(uodateOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * Xóa một đơn hàng bằng ID
 */
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleteOrder = await ordersService.deleteOrder(id);
    sendJsonSuccess(res)(deleteOrder);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
