import { createTRPCRouter } from "./trpc";
import { languageRouter } from "./routers/languages";
import { projectRouter } from "./routers/projects";
import { userRouter } from "./routers/users";
import { admissionRouter } from "./routers/admissions";
import { updateRouter } from "./routers/updates";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  language: languageRouter,
  project: projectRouter,
  user: userRouter,
  admission: admissionRouter,
  update: updateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
