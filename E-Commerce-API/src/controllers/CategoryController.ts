import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess } from "../helpers/responseHandler";
import categoryService from "../services/CategoryService";
import Category from "../models/response/Category";
import { CategoryRespone } from "../models/response/CategoryResponse";

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    
    const categoryGetAll = await categoryService.getAllCategories(page, limit);

    const categories = categoryGetAll.categories.map((category) => {
      return new Category(
        category.id,
        category.category_name,
        category.description,
        category.slug
      );
    });

    const ressposnt = new CategoryRespone(
      categoryGetAll.totalRecords,
      categoryGetAll.totalPages,
      categoryGetAll.currentPage,
      categoryGetAll.recordsPerPage,
      categories
    );
    res.status(200).json(ressposnt);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryGetById = await categoryService.getCategoryById(req.params.id);
    console.log("categoryGetById", categoryGetById);
    // Kiểm tra xem product có null không
    if (categoryGetById === null) {
      // Nếu product là null, gửi phản hồi lỗi 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Tạo một đối tượng Category từ thông tin sản phẩm
    const category = new Category(
      categoryGetById.id,
      categoryGetById.category_name,
      categoryGetById.description,
      categoryGetById.slug
    );

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryGetBySlug = await categoryService.getCategoryBySlug(
      req.params.slug
    );
    console.log("categoryGetBySlug", categoryGetBySlug);

    // Kiểm tra xem product có null không
    if (categoryGetBySlug === null) {
      // Nếu product là null, gửi phản hồi lỗi 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Tạo một đối tượng Category từ thông tin sản phẩm
    const category = new Category(
      categoryGetBySlug.id,
      categoryGetBySlug.category_name,
      categoryGetBySlug.description,
      categoryGetBySlug.slug
    );

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newCategory = await categoryService.createCategory(payload);
    sendJsonSuccess(res)(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedCategory = await categoryService.updateCategory(id, payload);
    sendJsonSuccess(res)(updatedCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryService.deleteCategory(id);
    sendJsonSuccess(res)(deletedCategory);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
