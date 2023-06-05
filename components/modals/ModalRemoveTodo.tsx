import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Modals } from "@/context/ModalContext/index.types";
import useModal from "@/hooks/useModal";
import React from "react";

const ModalRemoveTodo = () => {
  const { modalParams, hideModal } = useModal(Modals.RemoveTodo);
  const { id, deleteTodo } = modalParams;
  const handleContinue = (id: number) => {
    deleteTodo(id);
    hideModal(Modals.RemoveTodo);
  };
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => hideModal(Modals.RemoveTodo)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleContinue(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalRemoveTodo;
