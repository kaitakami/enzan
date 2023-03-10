import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const admissionRouter = createTRPCRouter({
  ["submit"]: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.admission.create({
        data: {
          content: input.message,
          projectId: input.projectId,
          userId: ctx.session.user.id,
        },
      });
    }),
  ["accept"]: protectedProcedure
    .input(
      z.object({
        admissionId: z.string(),
        userId: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          members: {
            connect: {
              id: input.userId,
            },
          },
        },
      });

      await ctx.prisma.admission.delete({
        where: {
          id: input.admissionId,
        },
      });
    }),
  ["reject"]: protectedProcedure
    .input(
      z.object({
        admissionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.admission.delete({
        where: {
          id: input.admissionId,
        },
      });
    }),
});
