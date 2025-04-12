import axios from "axios";
import React, { useState } from "react";
import API from "../utils/axios/axios";
import { useCreateNote } from "../utils/createTodo";
import { useNavigate } from "react-router-dom";

interface FormDataType {
  email: string;
  name: string;
}

const CreateTodo = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateNote();

  const submitData = async (data: FormDataType) => {
    mutate(data, {
      onSuccess: () => {
        console.log("Mutation successful!"); // Debugging

        setFormData({ email: "", name: "" }); // Reset form

        console.log("Form data reset!"); // Debugging
        navigate("/");
        // Redirect after success
        console.log("Redirect triggered!");
      },
      onError: (error) => {
        console.error("Error submitting note:", error);
      },
    });
  };

  return (
    <div>
      <div className="w-full h-full flex justify-center">
        <div className="w-[450px] bg-slate-50 flex flex-col gap-[10px] p-[10px]">
          <h2>Create Todo</h2>
          {isLoading && <p></p>}
          <input
            onChange={(e) =>
              setFormData((prev: FormDataType) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="p-4"
            placeholder="Your Email"
          />

          <input
            onChange={(e) =>
              setFormData((prev: FormDataType) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="p-4"
            placeholder="Your Name"
          />

          <div>
            <button onClick={() => submitData(formData)}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
