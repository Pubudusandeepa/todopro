import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./axios/axios";

interface Note {
  email: string;
  name: string;
}

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNote: Note) => {
      const response = await API.post("/todos", newNote);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // Refresh notes list after adding a new note
    },
  });

  
};
