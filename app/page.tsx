"use client";
import TodoCard from "@/components/TodoCard";
import ModalRemoveTodo from "@/components/modals/ModalRemoveTodo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Modals } from "@/context/ModalContext/index.types";
import { todosContext } from "@/context/TodosContext";
import { SortOptions, Todo, TodoStatus } from "@/context/TodosContext/types";
import useModal from "@/hooks/useModal";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { modals, showModal } = useModal();
  const {
    todos,
    todoStatus,
    filterBy,
    sort,
    sortBy,
    deleteTodo,
    toggleTodoStatus,
    editTodo,
  } = useContext(todosContext);

  const onEditButtonClick = (todo: Todo) => {
    showModal(Modals.EditTodo, {
      editTodo,
      todo,
    });
  };

  return (
    <>
      <div className="container items-center justify-center">
        <div className="pt-16 mx-auto ">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <div className="flex w-full sm:w-auto">
              <Button
                className="flex-1 sm:flex-none"
                variant={todoStatus === TodoStatus.ALL ? "secondary" : "ghost"}
                onClick={() => filterBy(TodoStatus.ALL)}
              >
                All
              </Button>
              <Button
                className="flex-1 sm:flex-none"
                variant={
                  todoStatus === TodoStatus.ACTIVE ? "secondary" : "ghost"
                }
                onClick={() => filterBy(TodoStatus.ACTIVE)}
              >
                Active
              </Button>
              <Button
                className="flex-1 sm:flex-none"
                variant={
                  todoStatus === TodoStatus.COMPLETED ? "secondary" : "ghost"
                }
                onClick={() => filterBy(TodoStatus.COMPLETED)}
              >
                Completed
              </Button>
            </div>

            <Separator
              orientation="vertical"
              className="hidden h-10 sm:block"
            />
            <Select value={sort} onValueChange={sortBy}>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* sort options */}
                  <SelectItem value={SortOptions.NewestFirst}>
                    {SortOptions.NewestFirst}
                  </SelectItem>
                  <SelectItem value={SortOptions.OldestFirst}>
                    {SortOptions.OldestFirst}
                  </SelectItem>
                  <SelectItem value={SortOptions.NewestUpdatedFirst}>
                    {SortOptions.NewestUpdatedFirst}
                  </SelectItem>
                  <SelectItem value={SortOptions.OldestUpdatedFirst}>
                    {SortOptions.OldestUpdatedFirst}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="w-full ml-auto sm:w-auto" asChild>
              <Link href="/addTodo">New Todo</Link>
            </Button>
          </div>
          <Separator className="my-2" />
        </div>
        <div className="grid grid-cols-1 gap-5 pb-4 md:grid-cols-2">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={(id) =>
                showModal(Modals.RemoveTodo, { id, deleteTodo })
              }
              onToggleStatus={(id) => toggleTodoStatus(id)}
              onEdit={(todo) => onEditButtonClick(todo)}
            />
          ))}
        </div>
      </div>
      {modals.RemoveTodo ? <ModalRemoveTodo /> : null}
    </>
  );
}
