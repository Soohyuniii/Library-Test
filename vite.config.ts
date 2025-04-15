// 1. UMD 포맷
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Library-Test/", // ← GitHub repo명이랑 같게!
  plugins: [react()],
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "MapperWidget", // window.MapperWidget 또는 require('MapperWidget')
      fileName: (format) => `mapper-widget.${format}.js`, //  명시적으로 .js로 설정
      formats: ["umd"], // umd로 설경
    },
    rollupOptions: {
      output: {
        // React, ReactDOM을 외부 라이브러리로 처리
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      external: ["react", "react-dom"], // 외부 라이브러리(React, ReactDOM) 제외
    },
  },
});
