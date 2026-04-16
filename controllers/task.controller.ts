import { Request, Response } from "express";
import { Types } from "mongoose";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";
import { sendError, sendSuccess } from "../utils/api-response";

export const createTask = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, status, priority, dueDate, assignedTo } = req.body as {
    title?: string;
    description?: string;
    status?: "todo" | "in-progress" | "done";
    priority?: "low" | "medium" | "high";
    dueDate?: string;
    assignedTo?: string;
  };

  if (!title) {
    return sendError(res, 400, "title is required");
  }

  if (assignedTo) {
    const userExists = await User.findById(assignedTo);
    if (!userExists) {
      return sendError(res, 404, "Assigned user not found");
    }
  }

  const task = await Task.create({ title, description, status, priority, dueDate, assignedTo });
  return sendSuccess(res, 201, "Task created successfully", { task });
};

export const getTasks = async (req: Request, res: Response): Promise<Response> => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  const [tasks, totalItems] = await Promise.all([
    Task.find().populate("assignedTo", "name email").skip(skip).limit(limit),
    Task.countDocuments()
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return sendSuccess(res, 200, "Tasks fetched successfully", {
    items: tasks,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
};

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  const id = String(req.params.id);

  if (!Types.ObjectId.isValid(id)) {
    return sendError(res, 400, "Invalid task id");
  }

  const task = await Task.findById(id).populate("assignedTo", "name email");
  if (!task) {
    return sendError(res, 404, "Task not found");
  }
  return sendSuccess(res, 200, "Task fetched successfully", { task });
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  const id = String(req.params.id);
  const payload = req.body as {
    title?: string;
    description?: string;
    status?: "todo" | "in-progress" | "done";
    priority?: "low" | "medium" | "high";
    dueDate?: string;
    assignedTo?: string | null;
  };

  if (!Types.ObjectId.isValid(id)) {
    return sendError(res, 400, "Invalid task id");
  }

  if (payload.assignedTo) {
    const userExists = await User.findById(payload.assignedTo);
    if (!userExists) {
      return sendError(res, 404, "Assigned user not found");
    }
  }

  const task = await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  }).populate("assignedTo", "name email");

  if (!task) {
    return sendError(res, 404, "Task not found");
  }
  return sendSuccess(res, 200, "Task updated successfully", { task });
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const id = String(req.params.id);

  if (!Types.ObjectId.isValid(id)) {
    return sendError(res, 400, "Invalid task id");
  }

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return sendError(res, 404, "Task not found");
  }
  return sendSuccess(res, 200, "Task deleted successfully");
};
