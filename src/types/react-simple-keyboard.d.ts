// types/react-simple-keyboard.d.ts
declare module "react-simple-keyboard" {
  import * as React from "react";

  export interface KeyboardProps {
    layout?: Record<string, string[]>;
    onChange?: (input: string) => void;
    display?: Record<string, string>;
    theme?: string;
    layoutName?: string;
  }

  const Keyboard: React.FC<KeyboardProps>;
  export default Keyboard;
}
