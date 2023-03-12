import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const updateRouter = createTRPCRouter({
  ["create"]: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.update.create({
        data: {
          title: input.title,
          content: input.content,
          projectId: input.projectId,
          userId: ctx.session.user.id,
        },
      });
    }),
  ["remove"]: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.prisma.update.delete({
        where: {
          id,
        },
      });
    }),
});
