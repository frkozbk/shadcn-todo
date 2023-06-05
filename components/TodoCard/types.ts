import { Todo } from "@/context/TodosContext/types";

export interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onEdit: (todo: Todo) => void;
}
