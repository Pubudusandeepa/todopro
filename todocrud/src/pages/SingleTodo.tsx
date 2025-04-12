import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleTodo } from "../utils/hooks/useTodo";
import TodoEditForm from "../components/TodoEditForm";

const SingleTodo: React.FC = () => {
  const param = useParams<{ id: string }>();
  const [isClickEditForm, setIsEditForm] = useState(false);

  const { data, isLoading, isError, error } = useSingleTodo(param.id as string);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  console.log("single todo");
  console.log(data);
  return (
    <div className="flex flex-row justify-center">
      {!isClickEditForm && (
        <div className="flex flex-col gap-4 border border-red-600 p-3 rounded-md">
          <span>{data.email}</span>
          <p>{data.name}</p>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditForm((prev) => !prev)}
              className="bg-green-600 p-2"
            >
              Edit{" "}
            </button>
            <button className="bg-red-600 p-2">Delete</button>
          </div>
        </div>
      )}

      {isClickEditForm && <TodoEditForm {...data} />}
    </div>
  );
};

export default SingleTodo;
