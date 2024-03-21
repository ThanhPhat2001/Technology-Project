import { IProduct } from "../types/models";
import Product from "../models/database/ProductModel";

const getAllProducts = async (
  page: number,
  limit: number,
  categoryId: string | undefined,
  brandId: string | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined
) => {
  let query = Product.find()
    .populate("categoryId", "category_name id")
    .populate("brandId", "brand_name id")
    .lean({ virtuals: true })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (categoryId !== undefined) {
    query = query.where("categoryId").equals(categoryId);
  }

  if (brandId !== undefined) {
    query = query.where("brandId").equals(brandId);
  }

  if (minPrice !== undefined) {
    query = query.where("price").gte(minPrice); // Lọc các sản phẩm có giá lớn hơn hoặc bằng minPrice
  }

  if (maxPrice !== undefined) {
    query = query.where("price").lte(maxPrice); // Lọc các sản phẩm có giá nhỏ hơn hoặc bằng maxPrice
  }

  const products = await query;

  const totalRecords = await Product.countDocuments();
    //Số phần tử khớp với điều kiện lọc được
    const filteredCount = products.length;
  return {
    products,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit,
    filteredCount
  };
};
const getProductById = async (id: string) => {

  const productGetById = await Product.findById(id)
    .populate("categoryId",  "category_name id")
    .populate("brandId", "brand_name id")
    .lean({ virtuals: true })

  return productGetById;
};

const getProductBySlug = async (slug: string) => {

  const productGetBySlug = await Product.findOne({ slug: slug }, "-__v")
    .populate("categoryId", "category_name id")
    .populate("brandId", "category_name id")
    .lean({ virtuals: true });

  return productGetBySlug;
};

const createProduct = async (payload: IProduct) => {
  const newProduct = await Product.create(payload);
  return newProduct;
};

const updateProduct = async (id: string, payload: IProduct) => {
  const updateProduct = Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updateProduct;
};

const deleteProduct = async (id: string) => {
  const deleteProduct = Product.findByIdAndDelete(id);
  return deleteProduct;
};

export default {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
}
