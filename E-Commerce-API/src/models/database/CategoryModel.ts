import { Schema, model } from "mongoose";
import { ICategory } from "../../types/models";
import buildSlug from "../../helpers/buildSlug";

const categorySchema = new Schema<ICategory>(
  {
    category_name: {
      type: String,
      maxlength: [50, "Chỉ cho phép tối đa 50 kí tự"],
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: [500, "Chỉ cho phép tối đa 500 kí tự"],
      trim: true,
    },
    slug: {
      type: String,
      maxlength: [50, "Chỉ cho phép tối đa 50 kí tự"],
      unique: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          // Cho phép để trống
          if (!value) return true;
          // Nếu có điền thì validate
          if (value.length > 0) {
            const slugRegex = /^[a-z0-9\-]+$/;
            return slugRegex.test(value);
          }
          return true;
        },
        message:
          "Slug must be unique and contain only letters, numbers, and hyphens",
      },
    },
  },
  {
    timestamps: true, //tạo thêm trường ngày tháng
    toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
    toObject: { virtuals: true },
  }
);

// Middleware để tự động tạo slug từ category_name và gán vào trường slug trước khi lưu vào cơ sở dữ liệu
categorySchema.pre<ICategory>("save", async function (next) {
  if (!this.slug) {
    this.slug = buildSlug(this.category_name);
  }
  next();
});

const Category = model<ICategory>("Category", categorySchema);
export default Category;
