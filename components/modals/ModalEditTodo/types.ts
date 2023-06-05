import { Todo } from "@/context/TodosContext/types";

export interface IModalEditTodoModalProps {
  todo: Todo;
  editTodo: (todo: Todo) => void;
}
