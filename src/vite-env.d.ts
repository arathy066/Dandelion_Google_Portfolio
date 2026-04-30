/// <reference types="vite/client" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.JPG' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
