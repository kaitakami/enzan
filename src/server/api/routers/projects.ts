import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { cleanDuration } from "@/utils/cleanDuration";
import type { Prisma } from "@prisma/client";

export const projectRouter = createTRPCRouter({
  ["get-all"]: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      include: {
        languages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return projects;
  }),

  ["get"]: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const project = ctx.prisma.project
        .findUnique({
          where: {
            id: input.id,
          },
        })
        .catch((err) => console.log(err));
      return project;
    }),

  ["get-all-filters"]: publicProcedure
    .input(
      z.object({
        language: z.string().or(z.undefined()),
        duration: z.enum(["7", "14", "30", ">30"]).or(z.undefined()).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input: filters }) => {
      const where: Prisma.ProjectWhereInput = {};

      if (filters.language) {
        where.languages = {
          some: { name: filters.language },
        };
      }

      if (filters.duration) {
        const duration = cleanDuration(filters.duration);
        where.duration = {
          gte: duration.min,
          lte: duration.max,
        };
      }

      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search } },
          { description: { contains: filters.search } },
          { tags: { hasSome: filters.search.split(" ") } },
        ];
      }

      const projects = await ctx.prisma.project.findMany({
        where,
        include: {
          languages: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return projects;
    }),
});
