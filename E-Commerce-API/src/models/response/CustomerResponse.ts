import { List } from "lodash";
import Customer from "../response/Customer";

export class CustomerRespone {
  private customers: List<Customer>;
  private totalRecords: number;
  private totalPages: number;
  private currentPage: number;
  private recordsPerPage: number;


  constructor(
    totalRecords: number,
    totalPages: number,
    currentPage: number,
    recordsPerPage: number,
    customers: List<Customer>
  ) {
    this.customers = customers;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.recordsPerPage = recordsPerPage;
  }

  /**
   * Getter $categogies
   * @return {List<Customer>}
   */
  public get $customers(): List<Customer> {
    return this.customers;
  }

  /**
   * Setter $categogies
   * @param {List<Customer>} value
   */
  public set $customers(value: List<Customer>) {
    this.customers = value;
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
