import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { serviceRouter } from "./routers/service";
import { providerRouter } from "./routers/provider";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  service: serviceRouter,
  provider: providerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
