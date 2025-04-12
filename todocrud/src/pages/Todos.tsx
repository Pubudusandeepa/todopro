import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteNotes } from "../utils/hooks/useTodos";
import Todo from "./Todo";

interface TodoProp {
  name: string;
  email: string;
  _id: string;
  __v: number;
}

const Todos = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteNotes();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/todo/create"); // Navigate to "/about" page
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error fetching notes</p>;

  return (
    <div className="w-full h-screen bg-red-300 p-20">
      <div className="flex flex-row justify-between">
        <p>Create Todo</p>
        <button className="bg-blue-400" onClick={handleClick}>
          Create
        </button>
      </div>

      <div className="">
        <ul>
          {data.pages.map((page: any, index:any) => (
            <div className="flex flex-row justify-between gap-4 py-5">
              <React.Fragment key={index}>
                {page.notes.map((todo: TodoProp) => (
                  <Todo {...todo} />
                ))}
              </React.Fragment>
            </div>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-4">
        {hasNextPage && (
          <button
            className="w-full p-2 bg-blue-500 text-white rounded mt-4"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Todos;
