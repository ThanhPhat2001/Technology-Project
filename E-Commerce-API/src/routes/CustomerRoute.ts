import express from "express";
import customerController from "../controllers/CustomerController";
import validateSchema from "../middleware/validateSchema.middleware";
import authMiddleware from "../middleware/AuthMiddleware";
import CustomerValidation from "../validations/CustomerValidation";

const router = express.Router();

router.get("/", customerController.getAllCustomers);

router.get("/:id", customerController.getCustomerById);

router.post(
  "/",
  validateSchema(CustomerValidation.createCustomer),
  customerController.createCustomer
);

router.patch(
  "/:id",
  validateSchema(CustomerValidation.updateCustomer),
  customerController.updateCustomer
);

router.delete(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.checkAuthorize(["Admin"]),
  customerController.deleteCustomer
);

export default router;
