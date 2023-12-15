import { PropsWithChildren } from 'react';

import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    accent: "#70A1FF",
    outline: "#E8E8E8",
  },
}

const Theme = (props: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export default Theme;
