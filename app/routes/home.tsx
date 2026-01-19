import { dbContext } from "~/context";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export async function loader({ context }: Route.LoaderArgs) {
    const start = Date.now();
    const sql = dbContext.get(context);
    const r = await sql`select * from users;`;
    return { r, delta: Date.now() - start };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <pre>
                <code>{JSON.stringify({ data: loaderData.r, delta: loaderData.delta + " ms" }, null, 2)}</code>
            </pre>
        </div>
    );
}
