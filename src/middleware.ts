import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const existingList = await context.session?.get("list");

  if (!existingList) {
    context.session?.set("list", []);
    return next();
  }

  return next();
});
