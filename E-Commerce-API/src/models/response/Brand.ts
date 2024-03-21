export default class Brand {
  private id: string;
  private brand_name: string;
  private description: string;
  private slug: string;

  public constructor(
    id: string,
    brand_name: string,
    description: string,
    slug: string
  ) {
    this.id = id;

    this.brand_name = brand_name;

    this.description = description;

    this.slug = slug;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getBrand_name(): string {
    return this.brand_name;
  }

  public setBrand_name(brand_name: string): void {
    this.brand_name = brand_name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getSlug(): string {
    return this.slug;
  }

  public setSlug(slug: string): void {
    this.slug = slug;
  }
}
