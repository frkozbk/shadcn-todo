import { Toaster } from "@/components/ui/toaster";
import { ModalContextProvider } from "@/context/ModalContext";
import { TodosProvider } from "@/context/TodosContext";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App - Next.js, Typescript, shadcn/ui",
  description: "Todo App - Next.js, Typescript, shadcn/ui",
};

export default function RootLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex")}>
        <ModalContextProvider>
          <TodosProvider>
            {children}
            {modals}
          </TodosProvider>
        </ModalContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
