import express from "express";
import employeesController from "../controllers/EmployeeController";
import employeeValidation from "../validations/EmployeeValidation";
import validateSchema from "../middleware/validateSchema.middleware";
import authMiddleware from "../middleware/AuthMiddleware";

const router = express.Router();

router.get("/", employeesController.getAllEmployees);

router.get("/:id", employeesController.getEmployeeById);

router.post(
  "/",
  validateSchema(employeeValidation.createEmployee),
  employeesController.createEmployee
);

router.patch(
  "/:id",
  validateSchema(employeeValidation.updateEmployee),
  employeesController.updateEmployee
);

router.delete(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.checkAuthorize(["Admin"]),
  employeesController.deleteEmployee
);

export default router;
