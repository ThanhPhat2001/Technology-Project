import Category from "../models/database/CategoryModel";
import { ICategory } from "../types/models";

const getAllCategories = async (page: number, limit: number) => {
  try {
    const categories = await Category.find()
      .select("-__v")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalRecords = await Category.countDocuments();

    return {
      categories,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      recordsPerPage: limit,
    };
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id: string) => {
  try {
    const categoryGetById = await Category.findById(id);
    return categoryGetById;
  } catch (error) {
    throw error;
  }
};

const getCategoryBySlug = async (slug: string) => {
  const categoryGetBySlug = await Category.findOne({ slug: slug }, "-__v");
  return categoryGetBySlug;
};

const createCategory = async (payload: ICategory) => {
  try {
    const newCategory = await Category.create(payload);
    return newCategory;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id: string, payload: ICategory) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id: string) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
  } catch (error) {
    throw error;
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
