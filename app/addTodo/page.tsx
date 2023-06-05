"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { todosContext } from "@/context/TodosContext";
import { TodoStatus } from "@/context/TodosContext/types";
import TodoSchema from "@/schemas/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

const AddTodoPage = () => {
  const router = useRouter();
  const { addTodo } = useContext(todosContext);
  const { toast } = useToast();

  const { control, handleSubmit } = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = (formState: z.infer<typeof TodoSchema>) => {
    const { title, description } = formState;

    const time = new Date().getTime();
    addTodo({
      title,
      description,
      status: TodoStatus.ACTIVE,
      createdAt: time,
      id: time,
      updatedAt: time,
    });
    router.push("/");
  };
  const onError = (errors: FieldErrors<z.infer<typeof TodoSchema>>) => {
    toast({
      title: "There was an error",
      description: (
        <ul>
          {errors?.title ? <li>{errors.title.message}</li> : null}
          {errors?.description ? <li>{errors.description.message}</li> : null}
        </ul>
      ),
    });
  };
  return (
    <div className="w-[450px] mx-auto pt-16 ">
      <form className="p-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Add Todo
        </h2>
        <div className="mt-8 space-y-6">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Todo Title"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Textarea
                placeholder="Todo Description"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Button className="w-full" type="submit">
            Add a new todo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoPage;
