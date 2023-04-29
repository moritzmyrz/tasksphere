import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.id },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      if (task.userId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
      }

      return task;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({ where: { userId: ctx.session.user.id } });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string().min(2) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.task.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.id },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      if (task.userId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
      }

      return ctx.prisma.task.delete({
        where: { id: input.id },
      });
    }),

  complete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.id },
      });

      if (!task) {
        throw new Error("Task not found");
      }

      if (task.userId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
      }

      return ctx.prisma.task.update({
        where: { id: input.id },
        data: { completed: true },
      });
    }),
});
