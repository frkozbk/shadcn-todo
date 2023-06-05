import { Todo } from "@/context/TodosContext/types";
import { Dispatch, SetStateAction } from "react";

// Modal Params
export enum Modals {
  RemoveTodo = "RemoveTodo",
  AddTodo = "AddTodo",
  EditTodo = "EditTodo",
}

export type ModalParams = {
  [Modals.RemoveTodo]: {
    id: number;
    deleteTodo: (id: number) => void;
  };
  [Modals.AddTodo]: {
    addTodo: (todo: Todo) => void;
  };
  [Modals.EditTodo]: {
    todo: Todo;
    editTodo: (todo: Todo) => void;
  };
};

export interface IModalContext {
  modals: TModals;
  setModals: Dispatch<SetStateAction<TModals>>;
  params: ModalParams;
  setParams: Dispatch<SetStateAction<ModalParams>>;
}
export type TModals = {
  [key in keyof typeof Modals]?: boolean;
};

export type GetModalArgs<
  M extends Modals,
  P extends ModalParams
> = M extends keyof P ? [M, P[M]] : [M];
