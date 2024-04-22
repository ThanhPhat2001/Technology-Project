import createError from "http-errors";
import Order from "../models/database/OrderModel";
import { IOrder } from "../types/models";

const getAllOrders = async (page: number, limit: number) => {
  const orders = await Order.find()
    .populate(
      "orderDetail.product",
      "_id product_name price discount"
    )
    .select("-__v")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalRecords = await Order.countDocuments();

  return {
    orders,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit,
  };
};

const getOrderById = async (id: string) => {
  const result = await Order.findById(id);

  if (!result) {
    throw createError(404, "Order not found");
  }
  return result;
};

const createOrder = async (data: IOrder) => {
  const result = await Order.create(data);
  return result;
};

const updateOrder = async (id: string, payload: IOrder) => {
  const order = await getOrderById(id);

  /**
   * Dùng assign để merge giữa cũ và mới lại với nhau
   * Sau đó save lại
   * Muốn update trường nào thì chỉ cần update trường đó
   */
  Object.assign(order, payload);
  await order.save();

  return order;
};

const deleteOrder = async (id: string) => {
  // const order = await Order.findByIdAndDelete(id);
  /* Tận dùng hàm có sẳn để tìm xem danh mục có tồn tại chưa */
  const order = await getOrderById(id);
  await Order.deleteOne({ _id: order._id });
  return order;
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
