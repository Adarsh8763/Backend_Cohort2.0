/// <reference types="vite/client" />

// SCSS Modules
declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// CSS files
declare module '*.css' {
  const css: string;
  export default css;
}

// SVG
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Images
declare module '*.png' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.webp' { const src: string; export default src; }
