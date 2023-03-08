import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { cleanDuration } from "@/utils/cleanDuration";
import type { Prisma } from "@prisma/client";

export const projectRouter = createTRPCRouter({
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
          include: {
            languages: true,
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
  ["create"]: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string(),
        duration: z.number(),
        public: z.boolean(),
        tags: z.array(z.string()),
        languages: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slugExists = await ctx.prisma.project.findUnique({
        where: {
          slug: input.slug,
        },
      });
      if (!slugExists) {
        const user: Prisma.UserUpdateInput = {
          id: ctx.session.user.id,
          projects: {
            create: {
              name: input.name,
              slug: input.slug,
              description: input.description,
              duration: input.duration,
              public: input.public,
              tags: input.tags,
              leaderId: ctx.session.user.id,
              languages: {
                connect: input.languages.map((lang) => ({ name: lang })),
              },
            },
          },
          points: {
            increment: 10,
          },
        };

        await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: user,
        });
        return {
          error: null,
        };
      } else {
        return {
          error: "Intenta cambiando el nombre del proyecto",
        };
      }
    }),
});
