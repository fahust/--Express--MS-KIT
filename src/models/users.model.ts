import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Product',
    },
    locale: {
      type: String,
      required: false,
      minlength: 4,
    },
    thumbnail: {
      type: String,
      required: false,
      minlength: 4,
    },
    firstName: {
      type: String,
      required: false,
      minlength: 4,
    },
    lastName: {
      type: String,
      required: false,
      minlength: 4,
    },
    userName: {
      type: String,
      required: false,
      minlength: 4,
    },
    phones: {
      type: [String],
      required: false,
      default: [],
    },
    hasNewsletter: {
      type: Boolean,
      required: false,
      default: false,
    },
    permissions: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
