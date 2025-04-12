import { Schema, model, Document } from 'mongoose';

// Define the interface for the User document
interface IToDo extends Document {
  name: string;
  email: string;
  
}

// Create the schema for User
const todoSchema = new Schema<IToDo>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
});

// Create the model
const User = model<IToDo>('Todo', todoSchema);

export default User;
