import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
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
  ["get"]: publicProcedure
    .input(
      z.object({
        id: z.string().or(z.undefined()),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: String(input.id),
        },
        select: {
          projects: {
            include: {
              languages: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          _count: {
            select: {
              updates: true,
            },
          },
          admissions: true,
          name: true,
          points: true,
          image: true,
          id: true,
          description: true,
          updates: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              project: {
                select: {
                  name: true,
                  slug: true,
                },
              },
              title: true,
              createdAt: true,
            },
          },
        },
      });
    }),
});
