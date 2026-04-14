import { Request, Response } from "express";
import { Types } from "mongoose";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

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
    return res.status(400).json({ message: "title is required" });
  }

  if (assignedTo) {
    const userExists = await User.findById(assignedTo);
    if (!userExists) {
      return res.status(404).json({ message: "Assigned user not found" });
    }
  }

  const task = await Task.create({ title, description, status, priority, dueDate, assignedTo });
  return res.status(201).json(task);
};

export const getTasks = async (_req: Request, res: Response): Promise<Response> => {
  const tasks = await Task.find().populate("assignedTo", "name email");
  return res.status(200).json(tasks);
};

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  const id = String(req.params.id);

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const task = await Task.findById(id).populate("assignedTo", "name email");
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(200).json(task);
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
    return res.status(400).json({ message: "Invalid task id" });
  }

  if (payload.assignedTo) {
    const userExists = await User.findById(payload.assignedTo);
    if (!userExists) {
      return res.status(404).json({ message: "Assigned user not found" });
    }
  }

  const task = await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  }).populate("assignedTo", "name email");

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(200).json(task);
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const id = String(req.params.id);

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(200).json({ message: "Task deleted successfully" });
};
