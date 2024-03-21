import { List } from "lodash";
import Product from "../response/Product";

export class ProductRespone {
  private products: List<Product>;
  private totalRecords: number;
  private totalPages: number;
  private currentPage: number;
  private recordsPerPage: number;
  private filteredCount: number

  constructor(
    totalRecords: number,
    totalPages: number,
    currentPage: number,
    recordsPerPage: number,
    filteredCount: number,
    products: List<Product>
  ) {
    this.products = products;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.recordsPerPage = recordsPerPage;
    this.filteredCount =filteredCount
  }

  /**
   * Getter $categogies
   * @return {List<Product>}
   */
  public get $products(): List<Product> {
    return this.products;
  }

  /**
   * Setter $categogies
   * @param {List<Product>} value
   */
  public set $products(value: List<Product>) {
    this.products = value;
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


  public get $filteredCount(): number {
    return this.filteredCount;
  }

  /**
   * Setter $totalRecords
   * @param {number} value
   */
  public set $filteredCount(value: number) {
    this.filteredCount = value;
  }
}
