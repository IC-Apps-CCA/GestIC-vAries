import * as React from 'react';
import {
  Box,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  SimpleGrid,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../../providers/AuthProvider';

export const NavBarMobile = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();
  const { user, signOut } = useAuth();

  return (
    <SimpleGrid
      // style={
      //   isMobile ? { display: "flex", justifyContent: "space-between" } : {}
      // }
      display="flex"
      justifyContent="space-between"
      columns={[null, null, 2]}
      w="100%"
      bg="teal"
      zIndex="5"
      color="white"
      p={4}
      gridTemplateColumns="0.5fr 1fr"
      alignItems="center"
      position="fixed"
    >
      {/* <Box w="100%" bg="teal" zIndex="3" color="white" p={4} position="fixed"> */}
      {/* <Flex gridGap={3}>
        <Box>GestIC</Box>
        <Box>
          <Link>Informativos</Link>
        </Box>
        <Box>
          <Link>Projetos Ativos</Link>
        </Box>
        <Box>
          <Link>Grupos</Link>
        </Box>
        <Box>
          <Link>Ofertas de Disciplina</Link>
        </Box>
        <Box>
          <Link>Informações Úteis</Link>
        </Box>
      </Flex> */}
      <Box>Gestic</Box>
      <Box>
        <Link fontSize="3xl" alignSelf="center" ref={btnRef} colorScheme="quaternary" onClick={onOpen}>
          {/* <Icon as={HamburgerIcon} /> */}
          <HamburgerIcon />
        </Link>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} initialFocusRef={btnRef} size="md">
          <DrawerOverlay>
            <DrawerContent bg="teal" color="white">
              <DrawerCloseButton top={8} right={4} fontSize="1rem" />
              <DrawerHeader pt={6}>
                <Box top={8} position="absolute">
                  {/* <Icon
                          as={LogoIcon}
                          fontSize="7.5rem"
                          mt="-1.8rem"
                          position="absolute"
                        /> */}
                  <Link href="/">GestIC</Link>
                </Box>
              </DrawerHeader>
              <DrawerBody
                fontWeight="bold"
                textAlign="center"
                justifyContent="space-between"
                display="flex"
                flexDir="column"
                // maxHeight="90%"
                py={12}
                mt={5}
              >
                <Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/informacoes-uteis">Informações Úteis</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="black" href="/calendario">Calendário</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/informativos">Informativos</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="black" href="/projetos-ativos">Projetos Ativos</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/grupos-de-pesquisa">Grupos de Pesquisa</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="black" href="/ofertas-disciplinas">Ofertas de Disciplina</Link>
                  </Box>
                </Box>
                {user && user.id !== '' ? (
                  <Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/perfil">Meu Perfil</Link>
                    </Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link onClick={signOut}>Sair</Link>
                    </Box>
                  </Box>
                ) : (
                  <Link href="/login">
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      Login
                    </Box>
                  </Link>
                )}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </SimpleGrid>
  );
};
