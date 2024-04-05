// import path from "node:path";

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-url": {
      url: "copy",
      // basePath: path.resolve("node_modules/geist/dist/fonts/"),
      assetsPath: "true",
      // useHash: true,
    },
  },
};
