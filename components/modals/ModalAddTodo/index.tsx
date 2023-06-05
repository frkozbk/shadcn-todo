import { IModalAddTodoModalProps } from "@/components/modals/ModalAddTodo/types";
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
import { TodoStatus } from "@/context/TodosContext/types";
import TodoSchema from "@/schemas/TodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

const ModalAddTodo = ({ addTodo }: IModalAddTodoModalProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit } = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof TodoSchema>) => {
    const { title, description } = values;
    const time = new Date().getTime();
    addTodo({
      title,
      description,
      status: TodoStatus.ACTIVE,
      createdAt: time,
      id: time,
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
          <DialogTitle>Add a new todo </DialogTitle>
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
            render={({ field: { onChange, value } }) => (
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
            className="flex-1"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit(onSubmit, (e) => onError(e))}
          >
            Add a new todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddTodo;
