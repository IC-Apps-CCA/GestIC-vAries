import React, { ReactNode } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import NavBar from '../NavBar';

type Props = {
  children: ReactNode;
};

const Page = ({ children }: Props) => {
  const [isLargerThan768] = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: !isLargerThan768 ? 'initial' : '3.5rem' }}>{children}</div>
    </div>
  );
};

export { Page };
