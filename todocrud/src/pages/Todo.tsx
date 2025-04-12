import React from "react";
import { useNavigate } from "react-router-dom";

interface TodoPropType {
  name: string;
  email: string;
  _id: string;
}

const Todo: React.FC<TodoPropType> = React.memo((data) => {
  const navigate = useNavigate();
  return (
    <div>
      <li
        className="gird grid-cols-3 p-3  gap-4 border border-gray-700"
        key={data._id}
        onClick={() => navigate(`/todo/${data._id}`)}
      >
        <h3 className="font-semibold">{data.name}</h3>
        <p>{data.email}</p>
      </li>
    </div>
  );
});

export default Todo;
