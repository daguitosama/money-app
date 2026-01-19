import { dbContext } from "~/context";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export async function loader({ context }: Route.LoaderArgs) {
    const sql = dbContext.get(context);
    const r = await sql`select * from users;`;
    return { r };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <pre>
                <code>{JSON.stringify(loaderData.r, null, 2)}</code>
            </pre>
        </div>
    );
}
