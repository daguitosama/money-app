import postgres from "postgres";
import { createRequestHandler, RouterContextProvider } from "react-router";
import { dbContext } from "~/context";

declare module "react-router" {
    export interface AppLoadContext {
        cloudflare: {
            env: Env;
            ctx: ExecutionContext;
        };
    }
}

const requestHandler = createRequestHandler(() => import("virtual:react-router/server-build"), import.meta.env.MODE);

export default {
    async fetch(request, env, ctx) {
        const rrCtx = new RouterContextProvider();
        dbContext.set(rrCtx, postgres(env.HYPERDRIVE.connectionString));
        return requestHandler(request, rrCtx);
    },
} satisfies ExportedHandler<Env>;
