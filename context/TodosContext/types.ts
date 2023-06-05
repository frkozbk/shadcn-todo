import { ReactNode } from "react";

export type TodosContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  editTodo: (todo: Todo) => void;
  sortBy: (sortOption: SortOptions) => void;
  toggleTodoStatus: (id: number) => void;
  filterBy: (todoStatus: TodoStatus) => void;
  todoStatus: TodoStatus;
  sort: SortOptions;
};
export interface ITodosProviderProps {
  children: ReactNode;
}
export enum TodoStatus {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}
export type Todo = {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: number;
  updatedAt: number;
};
export enum SortOptions {
  OldestFirst = "Oldest First",
  NewestFirst = "Newest First",
  OldestUpdatedFirst = "Oldest Updated First",
  NewestUpdatedFirst = "Newest Updated First",
}
