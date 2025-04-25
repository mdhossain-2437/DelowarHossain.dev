declare module 'scramble-text' {
  interface ScrambleTextOptions {
    timeOffset?: number;
    chars?: string;
    callback?: Function;
    afterComplete?: Function;
  }

  class ScrambleText {
    constructor(element: HTMLElement | Element, options?: ScrambleTextOptions);
    start(): void;
    stop(): void;
    setText(text: string): void;
  }

  export = ScrambleText;
}