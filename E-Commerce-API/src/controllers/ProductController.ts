import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import productService from '../services/ProductService';
import Product from '../models/response/Product';
import { ProductRespone } from '../models/response/ProductResposponse';


const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const page = req.query.page ? parseInt(req.query.page as string) : 1
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5; 
    const categoryId = req.query.categoryId ? String(req.query.categoryId) : undefined;
    const brandId = req.query.brandId ? String(req.query.brandId) : undefined;
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined;
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined;

    const productGetAll = await productService.getAllProducts( page, limit, categoryId, brandId,  minPrice, maxPrice);
    console.log("productGetAll",productGetAll);
    const products = productGetAll.products.map((product: any)=>{
      return new Product(
        product.id,
        product.product_name,
        product.price,
        product.discount,
        product.categoryId,
        product.brandId,
        product.description,
        product.stock,
        product.thumbnail,
        product.slug
      )
    });
    console.log("productGetAll", productGetAll);

    const productResponse = new ProductRespone(
      productGetAll.totalRecords,
      productGetAll.totalPages,
      productGetAll.currentPage,
      productGetAll.recordsPerPage,
      productGetAll.filteredCount,
      products
    )

    res.status(200).json(productResponse);
  } catch (error) {
    next(error);
  }
};



const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productGetById = await productService.getProductById(req.params.id);

    if (productGetById === null) {
      return res.status(404).json({ message: "Product not found" });
    }


    const product = new Product(
      productGetById.id,
      productGetById.product_name,
      productGetById.price,
      productGetById.discount,
      productGetById.categoryId as any,
      productGetById.brandId  as any,
      productGetById.description,
      productGetById.stock,
      productGetById.thumbnail,
      productGetById.slug
    )
    sendJsonSuccess(res)(product);
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productGetBySlug = await productService.getProductBySlug(req.params.slug);
    if (productGetBySlug === null) {
      return res.status(404).json({ message: "Product not found" });
    }


    const product = new Product(
      productGetBySlug.id,
      productGetBySlug.product_name,
      productGetBySlug.price,
      productGetBySlug.discount,
      productGetBySlug.categoryId as any,
      productGetBySlug.brandId  as any,
      productGetBySlug.description,
      productGetBySlug.stock,
      productGetBySlug.thumbnail,
      productGetBySlug.slug
    )
    sendJsonSuccess(res)(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newProduct = await productService.createProduct(payload);
    sendJsonSuccess(res)(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updatedProduct = await productService.updateProduct(id, payload);
    sendJsonSuccess(res)(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    sendJsonSuccess(res)(deletedProduct);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
}