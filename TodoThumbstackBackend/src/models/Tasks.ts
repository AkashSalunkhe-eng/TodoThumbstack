import mongoose, { Schema } from "mongoose";

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true }, 
    description: { type: String, trim: true }, 
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Due Date Passed"], 
      default: "Pending", 
    },
    dueDate: { type: Date, required: true }, 
  },
  { timestamps: true } 
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
