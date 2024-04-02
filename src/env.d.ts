/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BROWSERLESS_TOKEN: string;
  readonly VITE_CHROME_EXECUTABLE_PATH: string;
  readonly VITE_CONTENTFUL_SPACE_ID: string;
  readonly VITE_CONTENTFUL_ACCESS_TOKEN: string;
  readonly VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
  readonly VITE_TARGET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
