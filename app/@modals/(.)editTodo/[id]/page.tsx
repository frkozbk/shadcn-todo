"use client";
import ModalEditTodo from "@/components/modals/ModalEditTodo";
import { todosContext } from "@/context/TodosContext";
import { notFound } from "next/navigation";
import { useContext } from "react";
const EditTodoModal = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { todos, editTodo } = useContext(todosContext);
  const { id } = params;
  const todo = todos.find((todo) => todo.id === +id);
  if (!todo) {
    notFound();
  }
  return <ModalEditTodo todo={todo} editTodo={editTodo} />;
};
export default EditTodoModal;
