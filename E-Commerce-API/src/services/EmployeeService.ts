import Employee from "../models/database/EmployeeModel";
import { IEmployee } from "../types/models";

const getAllEmployees = async (page: number, limit: number) => {
  const employees = Employee.find()
  .select('-__v')
  .skip((page - 1) * limit)
  .limit(limit);
  const totalRecords = await Employee.countDocuments();
  
  return {
    employees,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    currentPage: page,
    recordsPerPage: limit,
  };
};

const getEmployeeById = async (id: string) => {
  console.log(id);
  const employeeGetById = await Employee.findById(id);
  return employeeGetById;
};

const createEmployee = async (payload: IEmployee) => {
  const newEmployee = await Employee.create(payload);
  return newEmployee;
};

const updateEmployee = async (id: string, payload: IEmployee) => {
  const updateEmployee = Employee.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updateEmployee;
};

const deleteEmployee = async (id: string) => {
  const deleteEmployee = Employee.findByIdAndDelete(id);
  return deleteEmployee;
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
