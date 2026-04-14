import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

userSchema.pre("save", async function save(next) {
  // Password is hashed in controller before create/update to keep flow explicit.
  next();
});

userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser, IUserModel>("User", userSchema);
