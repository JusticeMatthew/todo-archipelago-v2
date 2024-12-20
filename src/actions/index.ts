import { z } from "astro:schema";
import { defineAction } from "astro:actions";

export const server = {
  addTask: defineAction({
    accept: "form",
    input: z.object({
      task: z.string(),
    }),
    handler: async (input, context) => {
      const list = await context.session?.get("list");

      list.push(input.task);
      context.session?.set("list", list);

      return list;
    },
  }),
  deleteTask: defineAction({
    accept: "json",
    input: z.number(),
    handler: async (input, context) => {
      const list = await context.session?.get("list");

      list.splice(input, 1);
      context.session?.set("list", list);

      return list;
    },
  }),
};
