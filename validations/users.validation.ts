import { Schema } from "express-validator";

export const registerUserValidationSchema: Schema = {
  name: {
    in: ["body"],
    notEmpty: { errorMessage: "Name is required" },
    isString: { errorMessage: "Name must be a string" },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: "Name must be between 3 and 50 characters"
    },
    trim: true
  },
  email: {
    in: ["body"],
    notEmpty: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email" },
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: "Email must be between 5 and 100 characters"
    },
    trim: true,
    normalizeEmail: true
  },
  password: {
    in: ["body"],
    notEmpty: { errorMessage: "Password is required" },
    isString: { errorMessage: "Password must be a string" },
    isLength: {
      options: { min: 8, max: 50 },
      errorMessage: "Password must be between 8 and 50 characters"
    },
    isStrongPassword: {
      options: { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
      errorMessage: "password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
    },
    trim: true
  }
};

export const loginUserValidationSchema: Schema = {
  email: {
    in: ["body"],
    notEmpty: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Invalid email" },
    trim: true,
    normalizeEmail: true
  },
  password: {
    in: ["body"],
    notEmpty: { errorMessage: "Password is required" },
    isString: { errorMessage: "Password must be a string" },
    isLength: {
      options: { min: 8, max: 50 },
      errorMessage: "Password must be between 8 and 50 characters"
    },
    trim: true
  }
};

export const usersPaginationValidationSchema: Schema = {
  page: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "page must be a positive integer"
    },
    toInt: true
  },
  limit: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1, max: 100 },
      errorMessage: "limit must be an integer between 1 and 100"
    },
    toInt: true
  }
};