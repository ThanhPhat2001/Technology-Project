import { Schema } from "mongoose";

interface Category {
  id: string | Schema.Types.ObjectId;
  category_name: string;
}

interface Brand {
  id: string | Schema.Types.ObjectId;
  brand_name: string;
}

export default class Product {
  private id: string | Schema.Types.ObjectId;;
  private product_name: string;
  private price: number;
  private discount: number;
  private categoryId: Category;
  private brandId: Brand;
  private description: string;
  private stock: number;
  private thumbnail: string;
  private slug: string;

  public constructor(
    id: string | Schema.Types.ObjectId,
    product_name: string,
    price: number,
    discount: number,
    categoryId: Category,
    brandId: Brand,
    description: string,
    stock: number,
    thumbnail: string,
    slug: string
  ) {
    this.id=id;
    this.product_name=product_name;
    this.price=price;
    this.discount=discount;
    this.categoryId=categoryId;
    this.brandId=brandId;
    this.description=description;
    this.stock=stock;
    this.thumbnail=thumbnail;
    this.slug=slug;
  }

  public getId(): string | Schema.Types.ObjectId {
    return this.id;
  }

  public setId(id: string | Schema.Types.ObjectId): void {
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

  public getThumbnail(): string {
    return this.thumbnail;
  }

  public setThumbnail(thumbnail: string): void {
    this.thumbnail = thumbnail;
  }

  public getSlug(): string {
    return this.slug;
  }

  public setSlug(slug: string): void {
    this.slug = slug;
  }
}
