import { A, Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import { NoContent } from "~/components/svgs";

export default function NotFound() {
  return (
    <main class="container mx-auto p-4 text-center text-gray-700">
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />

      <h1 class="max-6-xs my-16 text-6xl font-thin uppercase text-sky-700">
        Page Not Found
      </h1>
      <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>
      </p>

      <NoContent class="mx-auto w-64" />
    </main>
  );
}
