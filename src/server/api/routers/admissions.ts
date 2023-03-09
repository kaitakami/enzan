import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const admissionRouter = createTRPCRouter({
  ["submit"]: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        projectId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.admission.create({
        data: {
          content: input.message,
          projectId: input.projectId,
          userId: ctx.session.user.id,
        }
      });
    }),
});
