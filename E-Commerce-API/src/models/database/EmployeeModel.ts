import { Schema, model } from "mongoose";
import { IEmployee } from "../../types/models";

const employeeSchema = new Schema<IEmployee>(
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
    address: {
      type: String,
      trim: true,
      maxlength: [255, "Chỉ cho phép tối đa 255 kí tự"],
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
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "User", "Editor"],
      default: "User",
    }
  },
  {
    timestamps: true, //true tự tạo ra createAt và updateAt
    toJSON: { virtuals: true }, // <-- include virtuals in `JSON.stringify()`
    toObject: { virtuals: true },
  }
);
// Virtual for this genre instance fullName.
employeeSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

const Employee = model<IEmployee>("Employee", employeeSchema);
export default Employee;
