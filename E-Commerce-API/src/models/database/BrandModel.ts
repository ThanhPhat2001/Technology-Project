import { Schema, model } from "mongoose";
import { IBrand } from "../../types/models";
import buildSlug from "../../helpers/buildSlug";

const brandSchema = new Schema<IBrand>(
  {
    brand_name: {
      type: String,
      maxlength: [100, "Chỉ cho phép tối đa 100 kí tự"],
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
      maxlength: [100, "Chỉ cho phép tối đa 100 kí tự"],
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
brandSchema.pre<IBrand>("save", async function (next) {
  if (!this.slug) {
    this.slug = buildSlug(this.brand_name);
  }
  next();
});

const Brand = model<IBrand>("Brand", brandSchema);
export default Brand;
