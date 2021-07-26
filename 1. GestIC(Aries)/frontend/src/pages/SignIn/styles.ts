import styled from '@emotion/styled';

import { Box as BoxUI } from '@chakra-ui/react';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: aquamarine;
`;

export const Box = styled(BoxUI)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  background: white;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
`;
