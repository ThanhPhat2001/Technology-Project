export default class Category { 

    private id: string;
    private category_name: string;
    private description: string;
    private slug: string;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getCategory_name(): string {
        return this.category_name;
    }

    public setCategory_name(category_name: string): void {
        this.category_name = category_name;
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


    public constructor(id: string, category_name: string, description: string, slug: string) {
        this.id = id;

        this.category_name = category_name;

        this.description = description;

        this.slug = slug;

    };


}
