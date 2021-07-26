import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {},
  fonts: {},
  components: {
    Button: {
      baseStyle: {},
      variants: {
        solid: {},
        outline: {},
      },
    },
  },
});
export default theme;
