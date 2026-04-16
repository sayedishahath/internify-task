import { Schema } from "express-validator";

export const createTaskValidationSchema: Schema = {
  title: {
    in: ["body"],
    notEmpty: { errorMessage: "Title is required" },
    isString: { errorMessage: "Title must be a string" },
    isLength: {
      options: { min: 3, max: 120 },
      errorMessage: "Title must be between 3 and 120 characters"
    },
    trim: true
  },
  description: {
    in: ["body"],
    notEmpty: { errorMessage: "Description is required" },
    isString: { errorMessage: "Description must be a string" },
    isLength: {
      options: { max: 1000 },
      errorMessage: "Description can be up to 1000 characters"
    },
    trim: true
  },
  status: {
    in: ["body"],
    notEmpty: { errorMessage: "Status is required" },
    isIn: {
      options: [["todo", "in-progress", "done"]],
      errorMessage: "Status must be one of todo, in-progress, done"
    }
  },
  priority: {
    in: ["body"],
    notEmpty: { errorMessage: "Priority is required" },
    isIn: {
      options: [["low", "medium", "high"]],
      errorMessage: "Priority must be one of low, medium, high"
    }
  },
  dueDate: {
    in: ["body"],
    notEmpty: { errorMessage: "dueDate is required" },
    isISO8601: { errorMessage: "dueDate must be a valid ISO date" }
  },
  assignedTo: {
    in: ["body"],
    notEmpty: { errorMessage: "assignedTo is required" },
    isMongoId: { errorMessage: "assignedTo must be a valid user id" }
  }
};

export const updateTaskValidationSchema: Schema = {
  title: {
    in: ["body"],
    notEmpty: { errorMessage: "Title is required" },
    isString: { errorMessage: "Title must be a string" },
    isLength: {
      options: { min: 3, max: 120 },
      errorMessage: "Title must be between 3 and 120 characters"
    },
    trim: true
  },
  description: {
    in: ["body"],
    notEmpty: { errorMessage: "Description is required" },
    isString: { errorMessage: "Description must be a string" },
    isLength: {
      options: { max: 1000 },
      errorMessage: "Description can be up to 1000 characters"
    },
    trim: true
  },
  status: {
    in: ["body"],
    notEmpty: { errorMessage: "Status is required" },
    isIn: {
      options: [["todo", "in-progress", "done"]],
      errorMessage: "Status must be one of todo, in-progress, done"
    }
  },
  priority: {
    in: ["body"],
    notEmpty: { errorMessage: "Priority is required" },
    isIn: {
      options: [["low", "medium", "high"]],
      errorMessage: "Priority must be one of low, medium, high"
    }
  },
  dueDate: {
    in: ["body"],
    notEmpty: { errorMessage: "dueDate is required" },
    isISO8601: { errorMessage: "dueDate must be a valid ISO date" }
  },
  assignedTo: {
    in: ["body"],
    notEmpty: { errorMessage: "assignedTo is required" },
    custom: {
      options: (value) => {
        if (value === null) {
          return true;
        }
        if (typeof value === "string" && value.length > 0) {
          return true;
        }
        throw new Error("assignedTo must be a valid user id or null");
      }
    },
    isMongoId: {
      if: (value: unknown) => value !== null,
      errorMessage: "assignedTo must be a valid user id"
    }
  }
};

export const taskIdParamValidationSchema: Schema = {
  id: {
    in: ["params"],
    notEmpty: { errorMessage: "Task id is required" },
    isMongoId: { errorMessage: "Task id must be a valid Mongo id" }
  }
};

export const tasksPaginationValidationSchema: Schema = {
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
