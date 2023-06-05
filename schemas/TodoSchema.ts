import * as z from "zod";

const TodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character long.",
    })
    .max(255, {
      message: "Title must be at most 255 characters long.",
    }),
  description: z
    .string({})
    .min(1, {
      message: "Description must be at least 1 character long.",
    })
    .max(255, {
      message: "Description must be at most 255 characters long.",
    }),
});
export default TodoSchema;
