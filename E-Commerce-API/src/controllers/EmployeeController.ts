import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess } from "../helpers/responseHandler";
import employeeService from "../services/EmployeeService";
import Employee from "../models/response/Employee";

const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeGetAll = await employeeService.getAllEmployees();
    console.log("employeeGetAll", employeeGetAll);

    const employees = employeeGetAll.map((employee) => {
      return new Employee(
        employee.id,
        employee.firstName,
        employee.lastName,
        employee.fullName,
        employee.email,
        employee.phoneNumber,
        employee.address,
        employee.birthDay,
        employee.photo,
        employee.role,
        employee.active
      );
    });

    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employeeGetById = await employeeService.getEmployeeById(req.params.id);

    if (employeeGetById === null) {
      // Nếu product là null, gửi phản hồi lỗi 404
      return res.status(404).json({ message: "employee not found" });
    }

    const employee = new Employee(
      employeeGetById.id,
      employeeGetById.firstName,
      employeeGetById.lastName,
      employeeGetById.fullName,
      employeeGetById.email,
      employeeGetById.phoneNumber,
      employeeGetById.address,
      employeeGetById.birthDay,
      employeeGetById.photo,
      employeeGetById.role,
      employeeGetById.active
    );

    res.status(200).json(employee);
        console.log( employee);
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const newEmployee = await employeeService.createEmployee(payload);
    sendJsonSuccess(res)(newEmployee);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    const updatedEmployee = await employeeService.updateEmployee(id, payload);
    sendJsonSuccess(res)(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await employeeService.deleteEmployee(id);
    sendJsonSuccess(res)(deletedEmployee);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
