import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  ["getUnique"]: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          projects: true,
        },
      });
      return user;
    }),
});
