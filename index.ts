import { Application } from "https://deno.land/x/oak/mod.ts";
import { GraphQLService } from "./server.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

// app.use((ctx) => {
//   ctx.response.body = "hola";
// });

console.log(`server is ready at http://localhost:8000`);

await app.listen({ port: 8000 });
