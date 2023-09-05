import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import serve from "rollup-plugin-serve";

const packageJson = require("./package.json");

const isProduction = process.env.NODE_ENV === "production";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      {
        name: "ReactUseDisposableList",
        file: "dist/use-disposable-list.js",
        format: "umd",
        globals: {
          react: "React",
        },
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      isProduction && terser(),
      !isProduction &&
        serve({
          contentBase: ["dist", "playground"],
          open: true,
          port: 3009,
        }),
    ],
    external: ["react", "react-dom", "styled-components"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
];
