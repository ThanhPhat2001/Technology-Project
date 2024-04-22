import express from "express";
import productController from "../controllers/ProductController";
import validateSchema from "../middleware/validateSchema.middleware";
import authMiddleware from "../middleware/AuthMiddleware";
import ProductValidation from "../validations/ProductValidation";

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.get("/slug/:slug", productController.getProductBySlug);

router.post(
  "/",
  // validateSchema(ProductValidation.createProduct),
  productController.createProduct
);

router.patch(
  "/:id",
  // validateSchema(ProductValidation.updateProduct),
  productController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.checkAuthorize(["Admin"]),
  productController.deleteProduct
);

export default router;
