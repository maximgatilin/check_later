import { PropsWithChildren } from 'react';

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    accent: '#70A1FF',
    outline: '#E8E8E8',
  },
  shadows: {
    card: '0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,3%);',
  },
};

function Theme({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
