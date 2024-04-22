import { Schema, model } from "mongoose";
import { IProduct } from "../../types/models";
import buildSlug from "../../helpers/buildSlug";
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

// const arrayLimit = (val: any) => val.length <= 5;

// const imageSchema = new Schema({
//   url: { type: String },
// }, { _id: false });

const productSchema = new Schema<IProduct>({
  product_name: {
    type: String,
    maxlength: [255, "Chỉ cho phép tối đa 255 kí tự"],
    unique: true,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    maxlength: [255, "Chỉ cho phép tối đa 255 kí tự"],
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
  price: {
    type: Number,
    required: true,
    validate: {
        validator: function (value: number) {
          return value >= 0; 
        },
        message: "Price must be above or equal to 0",
      },
    default: 0
  },
  discount: {
    type: Number,
    validate: {
        validator: function (value: number) {
          return value >= 0 && value <= 70;
        },
        message: "Discount must be between 0 and 70",
      },
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true
  },
  description: {
    type: String,
    default: null
  },
  stock: {
    type: Number,
    validate: {
        validator: function (value: number) {
          return value >= 0; 
        },
        message: "Price must be above or equal to 0",
      },
    default: 0
  },
  images: {
    type: Array,
    default: []
  }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

productSchema.set('toJSON', { virtuals: true });
// Virtuals in console.log()
productSchema.set('toObject', { virtuals: true });
productSchema.plugin(mongooseLeanVirtuals);


productSchema.pre("save", async function (next) {
    if(!this.slug){
        this.slug = buildSlug(this.product_name); 
    }
    next();
});

productSchema.virtual('salePrice').get(function() {
  return this.price * (1 - this.discount / 100);
});


const Product = model<IProduct>("Product", productSchema);
export default Product;
