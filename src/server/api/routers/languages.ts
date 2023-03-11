import { createTRPCRouter, publicProcedure } from "../trpc";

import { prisma } from "@/server/db";

export const languageRouter = createTRPCRouter({
  ["get-all"]: publicProcedure.query(async () => {
    try {
      const languages = await prisma.language.findMany();
      return languages;
    } catch (error) {
      return [];
    }
  }),
});
