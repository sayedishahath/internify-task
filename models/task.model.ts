import { Document, Schema, Types, model } from "mongoose";

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  assignedTo?: Types.ObjectId;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    dueDate: { type: Date },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

export const Task = model<ITask>("Task", taskSchema);
