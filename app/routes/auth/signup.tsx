import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/signup";

export async function loader(params: LoaderFunctionArgs) {
    return { a: "a" };
}

export default function SignUp({ loaderData: { a } }: Route.ComponentProps) {
    return (
        <div>
            <h1>Signup of: {a}</h1>
        </div>
    );
}
