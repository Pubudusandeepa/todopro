import { useInfiniteQuery, useQueryClient  } from "@tanstack/react-query";
import API from "../axios/axios";

import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const fetchNotes = async ({ pageParam = 1 }) => {
    const limit = 5; // Define number of items per page
    const response = await API.get(`/todos?page=${pageParam}&limit=${limit}`);

    return { notes: response.data.todos, nextPage: response.data.nextPage };
  };
  
  export const useInfiniteNotes = () => {
    const queryClient = useQueryClient();

    const query = useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: fetchNotes,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? null, // Get next page
    });

    useEffect(() => {
      socket.on("todoAdded", (newTodo) => {
        queryClient.setQueryData(["todos"], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) =>
              index === 0 ? { ...page, notes: [newTodo, ...page.notes] } : page
            ),
          };
        });
      });
  

  
      return () => {
        socket.off("todoAdded");
      
  
        socket.disconnect();
       
      };
    }, [queryClient]);

    return query


  };