import * as React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import { NavBarDesktop } from './desktop';
import { NavBarMobile } from './mobile';

const NavBar = () => {
  const [isLargerThan768] = useMediaQuery('(max-width: 768px)');

  return !isLargerThan768 ? <NavBarDesktop /> : <NavBarMobile />;
};

export default NavBar;
