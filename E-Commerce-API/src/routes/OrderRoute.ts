import express, { Router } from "express";
import ordersController from "../controllers/OrderController";
import validateSchema from "../middleware/validateSchema.middleware";
import authMiddleware from "../middleware/AuthMiddleware";

const router: Router = express.Router();

router.get("/", ordersController.getAllOrders);

router.get("/:id", ordersController.getOrderById);

router.post(
  "/",
  ordersController.createOrder
);

router.patch(
  "/:id",
  ordersController.updateOrder
);

router.delete(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.checkAuthorize(["Admin"]),
  ordersController.deleteOrder
);

export default router;
