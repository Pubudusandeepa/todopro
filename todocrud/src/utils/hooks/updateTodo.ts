import {  useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../axios/axios";
import { useEffect } from "react";


import { io } from "socket.io-client";

const socket = io("http://localhost:5000");


interface Note {
    email: string;
    name: string;
  }

  const editTodo = async ({ id, data }: { id: string; data: Note }) => {
    const response = await API.post(`todos/edit/${id}`, data);
    return response.data;
  };


export const EditTodo = () => {
    const queryClient = useQueryClient();

   const query =  useMutation({ 
      mutationFn: editTodo,
 

      onSuccess: (updatedTodo) => {
        // queryClient.setQueryData(["todos"], (oldData: any) => {
        //   if (!oldData) return oldData;
  
        //   return {
        //     ...oldData,
        //     pages: oldData.pages.map((page: any) => ({
        //       ...page,
        //       notes: page.notes.map((todo: any) =>
        //         todo._id === updatedTodo._id ? updatedTodo : todo
        //       ),
        //     })),
        //   };
        // });
  
        // queryClient.invalidateQueries(["todos"]);
      },
    });




    useEffect(() => {
      console.log("🟢 Component mounted - Setting up socket listeners...");
  
      socket.on("todoUpdated", (updatedTodo) => {
        console.log("Received updated todo:", updatedTodo);

  
        queryClient.setQueryData(["todos"], (oldData: any) => {
          if (!oldData) return oldData;
  
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              notes: page.notes.map((todo: any) =>
                todo._id === updatedTodo._id ? updatedTodo : todo
              ),
            })),
          };
        });
  
        queryClient.invalidateQueries(["todos"]); // Ensures list is refreshed
      });
  
      return () => {
        console.log("🛑 Unsubscribing from socket events...");
        socket.off("todoUpdated");
        socket.disconnect();
      };
    }, [queryClient]);

  return query;
}