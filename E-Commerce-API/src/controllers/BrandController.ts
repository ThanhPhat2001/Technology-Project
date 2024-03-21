import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess } from "../helpers/responseHandler";
import brandService from "../services/BrandService";
import Brand from "../models/response/Brand";
import { BrandRespone } from "../models/response/BrandResponse";

const getAllBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    const brandGetAll = await brandService.getAllBrands(page, limit);
    console.log("brandGetAll", brandGetAll);

    const brands = brandGetAll.brands.map((brand) => {
      return new Brand(
        brand.id,
        brand.brand_name,
        brand.description,
        brand.slug
      );
    });

    const brandResposnt = new BrandRespone(
      brandGetAll.totalRecords,
      brandGetAll.totalPages,
      brandGetAll.currentPage,
      brandGetAll.recordsPerPage,
      brands
    );
    res.status(200).json(brandResposnt);
  } catch (error) {
    next(error);
  }
};

const getBrandById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brandGetById = await brandService.getBrandById(req.params.id);
    console.log("brandGetById", brandGetById);
    // Kiểm tra xem product có null không
    if (brandGetById === null) {
      // Nếu product là null, gửi phản hồi lỗi 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Tạo một đối tượng Category từ thông tin sản phẩm
    const brand = new Brand(
      brandGetById.id,
      brandGetById.brand_name,
      brandGetById.description,
      brandGetById.slug
    );

    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

const getBrandBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const brandGetBySlug = await brandService.getBrandBySlug(req.params.slug);
    console.log("brandGetBySlug", brandGetBySlug);

    // Kiểm tra xem product có null không
    if (brandGetBySlug === null) {
      // Nếu product là null, gửi phản hồi lỗi 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Tạo một đối tượng Category từ thông tin sản phẩm
    const brand = new Brand(
      brandGetBySlug.id,
      brandGetBySlug.brand_name,
      brandGetBySlug.description,
      brandGetBySlug.slug
    );

    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newBrand = await brandService.createBrand(payload);
    sendJsonSuccess(res)(newBrand);
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedBrand = await brandService.updateBrand(id, payload);
    sendJsonSuccess(res)(updatedBrand);
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedBrand = await brandService.deleteBrand(id);
    sendJsonSuccess(res)(deletedBrand);
  } catch (err) {
    next(err);
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
