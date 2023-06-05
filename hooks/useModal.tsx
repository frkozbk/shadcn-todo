import { ModalContext } from "@/context/ModalContext";
import {
  GetModalArgs,
  ModalParams,
  Modals,
} from "@/context/ModalContext/index.types";

import { useContext } from "react";

const useModal = <T extends keyof ModalParams>(modalName?: T) => {
  // context hooks
  const { modals, setModals, params, setParams } = useContext(ModalContext);
  // state
  // effect
  // other variables/functions

  const showModal = <M extends Modals, P extends ModalParams>(
    ...args: GetModalArgs<M, P>
  ) => {
    const [modalName, _params] = args;
    setParams((params) => ({
      ...params,
      [modalName]: { ...(_params ?? {}) },
    }));
    setModals((modals) => ({
      ...modals,
      [modalName]: true,
    }));
  };
  const hideModal = (modalName: Modals | Modals[]) => {
    if (Array.isArray(modalName)) {
      modalName.forEach((name) => {
        setModals((modals) => ({
          ...modals,
          [name]: false,
        }));
        setParams((params) => ({
          ...params,
          [name]: {},
        }));
      });
      return;
    }
    setModals((modals) => ({
      ...modals,
      [modalName]: false,
    }));
    setParams((params) => ({
      ...params,
      [modalName]: {},
    }));
  };
  const hideAllModals = () => {
    setParams({} as ModalParams);
    setModals({});
  };
  // render
  const modalParams = (
    modalName ? params[modalName] : null
  ) as T extends keyof ModalParams ? ModalParams[T] : null;
  return {
    setModals,
    modals,
    showModal,
    hideModal,
    hideAllModals,
    params,
    setParams,
    modalParams,
  };
};
export default useModal;
