import express, { Request, Response } from "express";
import User from "../models/todo";


const router = express.Router();

// Create a new user
router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  console.log(name, email);

  const newUser = new User({
    name,
    email,
  });

  try {
    await newUser.save();
    (req as any).io.emit("todoCreated", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error creating user" });
  }
});

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log(req.query.page);
    console.log(req.query.limit);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const todos = await User.find().skip(skip).limit(limit);

    const totalNotes = await User.countDocuments();

    res.status(200).json({
      todos,
      nextPage: skip + limit < totalNotes ? page + 1 : null, // Return next page
    });
  } catch (err) {
    res.status(400).json({ message: "Error fetching users" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: "Error fetching users" });
  }
});

router.post("/edit/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTodo = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
    });

    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });
    }

    if ((req as any).io) {
      console.log("Emitting todoUpdated event...");
      (req as any).io.emit("todoUpdated", updatedTodo);

      (req as any).io.sockets.sockets.forEach((socket: any) => {
        console.log("Active socket ID:", socket.id);
      });
    } else {
      console.log("req.io is undefined!");
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
