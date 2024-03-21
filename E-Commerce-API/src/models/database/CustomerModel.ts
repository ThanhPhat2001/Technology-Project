import { Schema, model } from "mongoose";
import { ICustomer } from "../../types/models";

const customerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
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
    street: {
        type: String,
        maxlength: 255,
        minlength: 5,
        required: true,
    },
    city: {
        type: String,
        maxlength: 50,
        minlength: 2,
        required: true,
    },
    state: {
        type: String,
        maxlength: 50,
        minlength: 2,
        required: true,
    },
    birthDay: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid password!`,
      },
    },
    photo: {
      type: String,
    },
    zip_code: {
        type: Number,
    }
  },
  {
    timestamps: true, //true tự tạo ra createAt và updateAt
    toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
    toObject: { virtuals: true },
  }
);
// Virtual for this genre instance fullName.
customerSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

const Customer = model<ICustomer>("Customer", customerSchema);
export default Customer;
