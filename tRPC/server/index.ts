import express from "express";
import { initTRPC } from '@trpc/server';
import {createExpressMiddleware} from '@trpc/server/adapters/express';
import cors from "cors";
const app=express();
const PORT=process.env.port||4002;
export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

const appRouter = router({
    greeting: publicProcedure.query(() => 'hello tRPC v10!'),
  });
app.use(cors());
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
    }),
  );

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

export type AppRouter = typeof appRouter;