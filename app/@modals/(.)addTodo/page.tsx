"use client";
import ModalAddTodo from "@/components/modals/ModalAddTodo";
import { todosContext } from "@/context/TodosContext";
import { useContext } from "react";
const AddTodoModal = () => {
  const { addTodo } = useContext(todosContext);

  return <ModalAddTodo addTodo={addTodo} />;
};
export default AddTodoModal;
