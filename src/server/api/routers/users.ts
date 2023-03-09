import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Prisma } from "@prisma/client";

export const userRouter = createTRPCRouter({
  ["edit-profile"]: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data: Prisma.UserUpdateInput = {};

      if (input.name) {
        data.name = input.name;
      }

      if (input.description) {
        data.description = input.description;
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: data,
      });
    }),
});
