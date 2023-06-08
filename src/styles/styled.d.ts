import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      orange: {
        main: string;
        hover: string;
        pressed: string;
        linear: string;
      }
      purple: string;
      white: string;
      black: string;
      gray: { [key: string] };
      pink: string;
    };
  }
}
