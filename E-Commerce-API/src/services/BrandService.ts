import Brand from "../models/database/BrandModel";
import { IBrand } from "../types/models";

const getAllBrands = async (page: number, limit: number) => {
  try {
    const brands = await Brand.find()
      .select("-__v")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalRecords = await Brand.countDocuments();

    return {
      brands,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      recordsPerPage: limit,
    };
  } catch (error) {
    throw error;
  }
};

const getBrandById = async (id: string) => {
  try {
    const brand = await Brand.findById(id);
    return brand;
  } catch (error) {
    throw error;
  }
};

const getBrandBySlug = async (slug: string) => {
  //Lấy tất cả ngoại trừ __v
  try {
    const brand = await Brand.findOne({ slug: slug }, "-__v");
    return brand;
  } catch (error) {
    throw error;
  }
};

const createBrand = async (payload: IBrand) => {
  try {
    const brand = await Brand.create(payload);
    return brand;
  } catch (error) {
    throw error;
  }
};

const updateBrand = async (id: string, payload: IBrand) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedBrand;
  } catch (error) {
    throw error;
  }
};

const deleteBrand = async (id: string) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    return deletedBrand;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllBrands,
  getBrandById,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand,
};
