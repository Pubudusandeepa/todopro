import { useQuery } from "@tanstack/react-query";
import API from "../axios/axios";


const fetchTodoById =async (id: string) => {
   const response = await API.get(`/todos/${id}`);
   return response.data
}

export const useSingleTodo = (id: string) => {
    return useQuery({
        queryKey: ["todo", id],
        queryFn: () => fetchTodoById(id),
        enabled: !!id

    })
}

