import { TodoCardProps } from "@/components/TodoCard/types";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TodoStatus } from "@/context/TodosContext/types";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";

const TodoCard = (props: TodoCardProps) => {
  const { todo, onDelete, onToggleStatus } = props;
  const { id, title, description, status } = todo;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="leading-tight line-clamp-1">{title}</CardTitle>
          <div className="flex items-center gap-1">
            <Link
              href={`/editTodo/${id}`}
              className={buttonVariants({ variant: "ghost" })}
            >
              <Edit size={16} />
              <p className="sr-only">Edit Todo</p>
            </Link>
            <Button variant="ghost" onClick={() => onDelete(id)}>
              <Trash size={16} color="red" />
            </Button>
            <Switch
              checked={status === TodoStatus.COMPLETED}
              onCheckedChange={() => onToggleStatus(id)}
            />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
