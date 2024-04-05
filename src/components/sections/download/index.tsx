import { createEffect, Show } from "solid-js";
import type { Component, JSX } from "solid-js";
import { action, useAction, useSubmission } from "@solidjs/router";
import cx from "clsx";
import Section from "~/components/section";
import ArrowDownTray from "~/components/svgs/arrow-down-tray";
import ThreeDots from "~/components/svgs/three-dots";

interface Props extends JSX.HTMLAttributes<HTMLElement> {}

const fetchPDF = action(async () => {
  const response = await fetch("/api/create-pdf");

  return await response.blob();
});

const Download: Component<Props> = (props) => {
  const download = useAction(fetchPDF);
  const data = useSubmission(fetchPDF);

  createEffect(() => {
    if (data.result instanceof Blob) {
      const url = window.URL.createObjectURL(data.result);

      const link = document.createElement("a");
      link.download = "DavidMurdochCV.pdf";
      link.href = url;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
  });

  return (
    <Section {...props} class={cx("print:hidden", props.class)}>
      <h2 class="text-5xl">Download</h2>

      <button
        class="mt-8 flex items-center gap-x-2 rounded-md border border-transparent bg-sky-700 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-sky-900 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none"
        onClick={download}
        disabled={data.pending}
      >
        <ArrowDownTray class="h-5 w-5" />
        Download this page as .pdf
        <Show when={data.pending}>
          <ThreeDots />
        </Show>
      </button>
      <pre class="mt-4 whitespace-pre-wrap break-normal font-mono">
        gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/screen
        -dNOPAUSE -dQUIET -dBATCH
        -sOutputFile=DavidMurdochCV-postGhostscript.pdf DavidMurdochCV.pdf
      </pre>
    </Section>
  );
};

export default Download;
