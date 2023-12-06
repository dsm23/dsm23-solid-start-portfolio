// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { Layout, NavObserverProvider } from "~/components";
import ReloadPrompt from "./reload-prompt";

import "./root.css";

const Root = () => (
  <Html lang="en" dir="ltr">
    <Head>
      <Title>David Murdoch Portfolio - Solid</Title>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta
        name="description"
        content="David Murdoch's Solid Start portfolio"
      />
      <Meta name="color-scheme" content="light dark" />
    </Head>
    <Body>
      <Suspense>
        <ErrorBoundary>
          <NavObserverProvider>
            <Layout>
              <Routes>
                <FileRoutes />
              </Routes>
            </Layout>
          </NavObserverProvider>
          <ReloadPrompt />
        </ErrorBoundary>
      </Suspense>
      <Scripts />
    </Body>
  </Html>
);

export default Root;
