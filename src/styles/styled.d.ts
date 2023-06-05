import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      purple: string;
      white: string;
      lime: string;
      black: string;
      gray: string;
      pink: string;
      blue: string;
    };
  }
}
