import { IModalEditTodoModalProps } from "@/components/modals/ModalEditTodo/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import TodoSchema from "@/schemas/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {} from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

const ModalEditTodo = (props: IModalEditTodoModalProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { editTodo, todo } = props;
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
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={(open) => !open && router.back()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Textarea
                placeholder="Todo Description"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <DialogFooter>
          <Button
            className="flex-1 "
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSubmit(onSubmit, onError)}>
            Edit Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditTodo;
