"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { todosContext } from "@/context/TodosContext";
import TodoSchema from "@/schemas/TodoSchema";
import { notFound, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const EditTodoPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const { id } = params;
  const { todos, editTodo } = useContext(todosContext);
  const todo = todos.find((todo) => todo.id === +id);
  if (!todo) {
    notFound();
  }

  const { control, handleSubmit } = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
    },
  });

  const onSubmit = (formState: z.infer<typeof TodoSchema>) => {
    const { title, description } = formState;

    const time = new Date().getTime();
    editTodo({
      ...todo,
      title,
      description,
      updatedAt: time,
    });
    router.back();
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
    <div className="w-[450px] mx-auto pt-16">
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

export default EditTodoPage;
