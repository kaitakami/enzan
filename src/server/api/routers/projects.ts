import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

import { prisma } from "@/server/db";

export const projectRouter = createTRPCRouter({
  ["get-all"]: publicProcedure.query(async () => {
    const projects = await prisma.project.findMany();
    return projects;
  }),
});
