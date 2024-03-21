import express from "express";
import BrandController from "../controllers/BrandController";
import brandValidation from "../validations/BrandValidation";
import validateSchema from "../middleware/validateSchema.middleware";
import authMiddleware from "../middleware/AuthMiddleware";

const router = express.Router();

router.get("/", BrandController.getAllBrands);

router.get("/:id", BrandController.getBrandById);

router.get("/slug/:slug", BrandController.getBrandBySlug);

router.post(
  "/",
  validateSchema(brandValidation.createBrand),
  BrandController.createBrand
);

router.patch(
  "/:id",
  validateSchema(brandValidation.updateBrand),
  BrandController.updateBrand
);

router.delete(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.checkAuthorize(["Admin"]),
  BrandController.deleteBrand
);

export default router;
