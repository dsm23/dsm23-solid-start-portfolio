import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Layout, NavObserverProvider } from "./components";

import "./root.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense>
          <MetaProvider>
            <Title>David Murdoch Portfolio - Solid</Title>
            <Meta
              name="description"
              content="David Murdoch's Solid Start portfolio"
            />
            <Meta name="color-scheme" content="light dark" />
            <NavObserverProvider>
              <Layout>{props.children}</Layout>
            </NavObserverProvider>
          </MetaProvider>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
