import express from "express";
import categoriesController from "../controllers/CategoryController";
import categoryValidation from "../validations/CategoryValidation";
import validateSchema from "../middleware/validateSchema.middleware";
import authMiddleware from "../middleware/AuthMiddleware";

const router = express.Router();

router.get("/", categoriesController.getAllCategories);

router.get("/:id", categoriesController.getCategoryById);

router.get("/slug/:slug", categoriesController.getCategoryBySlug);

router.post(
  "/",
  validateSchema(categoryValidation.createCategory),
  categoriesController.createCategory
);

router.patch(
  "/:id",
  validateSchema(categoryValidation.updateCategory),
  categoriesController.updateCategory
);

router.delete(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.checkAuthorize(["Admin"]),
  categoriesController.deleteCategory
);

export default router;
