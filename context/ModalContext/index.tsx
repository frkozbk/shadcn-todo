"use client";
import {
  IModalContext,
  ModalParams,
  TModals,
} from "@/context/ModalContext/index.types";
import { ReactNode, createContext, useState } from "react";

const ModalContext = createContext<IModalContext>({} as IModalContext);
ModalContext.displayName = "ModalContext";

const ModalContextProvider = (props: { children: ReactNode }) => {
  const [modals, setModals] = useState<TModals>({});
  const [params, setParams] = useState<ModalParams>({} as ModalParams);

  return (
    <ModalContext.Provider
      value={{
        modals,
        setModals,
        params,
        setParams,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider, ModalContext };
