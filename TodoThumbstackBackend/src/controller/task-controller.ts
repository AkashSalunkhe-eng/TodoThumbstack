import { Request, Response } from "express"
import Task from "../models/Tasks";


export const addNewTask = async (req: any, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;    
    const newTask = new Task({ title, description, status, dueDate });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
}


export const getAllTasks = async (req: Request, res: Response):Promise<any> => {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
};
  

export const updateSpecificTask = async (req: Request, res: Response):Promise<any> => {
  try {
    const id  = req.query.id;
    const updates = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteSpecificTask = async (req: Request, res: Response): Promise<any> => {  
  try {
    const id  = req.query.id;       
    const deletedTask = await Task.findByIdAndDelete(id);    
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};