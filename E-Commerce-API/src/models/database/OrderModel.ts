import { Schema, model } from "mongoose";
import { IOrder, IOderDetail, EnumOrderStatus, EnumPayments } from "../../types/models";
import Product from "../database/ProductModel";

const OrderDetailSchema = new Schema<IOderDetail>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },  
  totalPrice: {
    type: Number,
  }
});

OrderDetailSchema.pre<IOderDetail>('save', async function (next) {
  try {
    const product = await Product.findById(this.product);
    if (!product) {
      throw new Error('Product not found');
    }
    this.totalPrice = this.quantity * product.salePrice; // Calculate total price
    next();
  } catch (error) {
    next();
  }
});

const orderSchema = new Schema<IOrder>(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    orderStatus: {
      type: String,
      enum: [
        EnumOrderStatus.Pending, //Mới đặt hàng
        EnumOrderStatus.Confirmed, //Đã xác nhận đơn hàng
        EnumOrderStatus.Canceled, //Hủy đơn hàng
        EnumOrderStatus.PrepareShipping, //chuẩn bị giao hàng
        EnumOrderStatus.Shipping, //đang giao hàng
        EnumOrderStatus.CancelShipping, //hủy giao hàng
        EnumOrderStatus.Shipped, //đã giao hàng
        EnumOrderStatus.PendingPaid, //Chờ thanh toán
        EnumOrderStatus.Paid, //đã thanh toán
        EnumOrderStatus.Refund, //hoàn tiền
        EnumOrderStatus.Finished, //hoàn thành
      ],
      default: EnumOrderStatus.Pending,
    },
    orderDate: {
      type: Date,
      required: true
    },
    shippingDate: {
        type: Date,
        required: false
    },
    orderNote: {
      type: String,
      required: false
    },
    shippingStreet: {
      type: String,
      require: true,
    },
    shippingCity: {
        type: String,
        require: true,
      },
      shippingState: {
        type: String,
        require: true,
      },
      paymentType: {
        type: String,
        required: true,
        enum: [EnumPayments.Cash, EnumPayments.Cod,EnumPayments.Credit],
        default: EnumPayments.Cash
      },
      totalPrice: {
        type: Number
      },
    orderDetail: [OrderDetailSchema],
  },
  {
    timestamps: true, //true tự tạo ra createAt và updateAt
    toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
    toObject: { virtuals: true },
  }
);
// Tính tổng giá của tất cả các sản phẩm trong orderDetail và lưu vào trường totalPrice
orderSchema.pre<IOrder>('save', function (next) {
  try {
    let totalPrice = 0;
    for (const detail of this.orderDetail) {
      totalPrice += detail.totalPrice;
    }
    this.totalPrice = totalPrice;
    next();
  } catch (error) {
    next();
  }
});

const Order = model<IOrder>("Order", orderSchema);
export default Order;
