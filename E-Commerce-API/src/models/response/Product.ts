import { Schema, Types } from "mongoose";

interface Category {
  id: string | Types.ObjectId;
  category_name: string;
}

interface Brand {
  id: string | Types.ObjectId;
  brand_name: string;
}

export default class Product {
  private id: string | Types.ObjectId;
  private product_name: string;
  private price: number;
  private discount: number;
  private salePrice: number;
  private categoryId: Category;
  private brandId: Brand;
  private description: string;
  private stock: number;
  private images: string[] = [];
  private slug: string;

  constructor(
    id: string | Types.ObjectId,
    product_name: string,
    price: number,
    discount: number,
    salePrice: number,
    categoryId: Category,
    brandId: Brand,
    description: string,
    stock: number,
    images: string[] = [],
    slug: string
  ) {
    this.id = id;
    this.product_name = product_name;
    this.price = price;
    this.discount = discount;
    this.salePrice = salePrice;
    this.categoryId = categoryId;
    this.brandId = brandId;
    this.description = description;
    this.stock = stock;
    this.images = images;
    this.slug = slug;
  }

  public getId(): string | Types.ObjectId {
    return this.id;
  }

  public setId(id: string | Types.ObjectId): void {
    this.id = id;
  }

  public getProduct_name(): string {
    return this.product_name;
  }

  public setProduct_name(product_name: string): void {
    this.product_name = product_name;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getDiscount(): number {
    return this.discount;
  }

  public setDiscount(discount: number): void {
    this.discount = discount;
  }

  public getsalePrice(): number {
    return this.salePrice;
  }

  public setsalePrice(salePrice: number): void {
    this.salePrice = salePrice;
  }

  public getCategoryId(): Category {
    return this.categoryId;
  }

  public setCategoryId(categoryId: Category): void {
    this.categoryId = categoryId;
  }

  public getBrandId(): Brand {
    return this.brandId;
  }

  public setBrandId(brandId: Brand): void {
    this.brandId = brandId;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getStock(): number {
    return this.stock;
  }

  public setStock(stock: number): void {
    this.stock = stock;
  }

  public getImages(): string[] {
    return this.images;
  }

  public setImages(images: string[]): void {
    this.images = images;
  }

  public getSlug(): string {
    return this.slug;
  }

  public setSlug(slug: string): void {
    this.slug = slug;
  }
}
