import { PropsWithChildren } from 'react';

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    accent: '#70A1FF',
    outline: '#E8E8E8',
  },
};

function Theme({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
