/// <reference types="vite/client" />

declare module 'pdfjs-dist/build/pdf.worker.mjs?url' {
  const workerSrc: string;
  export default workerSrc;
}

declare module '*.pdf' {
  const src: string;
  export default src;
}
