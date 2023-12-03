import React, { PropsWithChildren } from 'react';

import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    accent: "#AFDBD2",
    outline: "#E8E8E8",
  },
}

const Theme = (props: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export default Theme;
