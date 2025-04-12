import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditTodo } from "../utils/hooks/updateTodo";

interface FormDataType {
  email: string;
  name: string;
}

interface EditTodoPropType {
  _id: string;
  email: string;
  name: string;
}

const TodoEditForm: React.FC<EditTodoPropType> = ({ _id, name, email }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    setFormData({ email, name });
  }, [email, name]);
  const navigate = useNavigate();
  const { mutate, isLoading } = EditTodo();

  console.log("Edit form", _id);

  const submitData = (formData: FormDataType) => {
    mutate(
      {
        id: _id,

        data:formData,
      },
      {
        onSuccess: () => {
          // navigate("/");
        },
      }
    );
  };
  return (
    <div>
      <div className="w-[450px] bg-slate-50 flex flex-col gap-[10px] p-[10px]">
        <h2>Edit Todo</h2>
        {isLoading && <p></p>}
        <input
          value={formData.email}
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
          value={formData.name}
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
  );
};

export default TodoEditForm;
