import postgres from "postgres";
import { RouterContextProvider, createContext } from "react-router";

function createContextWithAccessor<T>() {
    const ctx = createContext<T>();

    return {
        get: (provider: Readonly<RouterContextProvider>) => provider.get(ctx),
        set: (provider: RouterContextProvider, value: T) => provider.set(ctx, value),
    };
}

export const dbContext = createContextWithAccessor<postgres.Sql<any>>();

// export function getContext(
//     request: Request<unknown, IncomingRequestCfProperties<unknown>>,
//     env: Env,
//     ctx: ExecutionContext<unknown>
// ) {
//     const sql = postgres(env.DATABASE_URL);
//     const context = new RouterContextProvider();
//     const appContext = createContext<{
//         env: Env;
//         ctx: ExecutionContext<unknown>;
//         sql: postgres.Sql<any>;
//     }>();
//     context.set(appContext, { env, ctx, sql });
//     return context;
// }
