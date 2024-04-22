import { List } from "lodash";
import Employee from "../response/Employee";

export class EmployeeRespone {
  private employees: List<Employee>;
  private totalRecords: number;
  private totalPages: number;
  private currentPage: number;
  private recordsPerPage: number;


  constructor(
    totalRecords: number,
    totalPages: number,
    currentPage: number,
    recordsPerPage: number,
    employees: List<Employee>
  ) {
    this.employees = employees;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.recordsPerPage = recordsPerPage;
  }

  /**
   * Getter $categogies
   * @return {List<Employee>}
   */
  public get $employees(): List<Employee> {
    return this.employees;
  }

  /**
   * Setter $categogies
   * @param {List<Employee>} value
   */
  public set $employees(value: List<Employee>) {
    this.employees = value;
  }

  /**
   * Getter $currentPage
   * @return {number}
   */
  public get $currentPage(): number {
    return this.currentPage;
  }

  /**
   * Setter $currentPage
   * @param {number} value
   */
  public set $currentPage(value: number) {
    this.currentPage = value;
  }

  /**
   * Getter $recordsPerPage
   * @return {number}
   */
  public get $recordsPerPage(): number {
    return this.recordsPerPage;
  }

  /**
   * Setter $recordsPerPage
   * @param {number} value
   */
  public set $recordsPerPage(value: number) {
    this.recordsPerPage = value;
  }

  /**
   * Getter $totalPages
   * @return {number}
   */
  public get $totalPages(): number {
    return this.totalPages;
  }

  /**
   * Setter $totalPages
   * @param {number} value
   */
  public set $totalPages(value: number) {
    this.totalPages = value;
  }

  /**
   * Getter $totalRecords
   * @return {number}
   */
  public get $totalRecords(): number {
    return this.totalRecords;
  }

  /**
   * Setter $totalRecords
   * @param {number} value
   */
  public set $totalRecords(value: number) {
    this.totalRecords = value;
  }
}
