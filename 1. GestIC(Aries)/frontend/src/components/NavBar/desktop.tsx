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
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../../providers/AuthProvider';
import { BiChevronDown } from 'react-icons/bi';

export const NavBarDesktop = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();
  const { user, signOut } = useAuth();

  return (
    <SimpleGrid
      zIndex="5"
      display="flex"
      justifyContent="space-between"
      columns={[null, null, 3]}
      w="100%"
      bg="teal"
      color="white"
      p={4}
      gridTemplateColumns="0.5fr 1fr"
      alignItems="center"
    >
      <Box>
        <Flex alignItems="center">
          <Link fontSize="3xl" alignSelf="center" ref={btnRef} colorScheme="quaternary" onClick={onOpen}>
            {/* <Icon as={HamburgerIcon} /> */}
            <HamburgerIcon />
          </Link>
          {/* <Heading size="md" ml={4}><Link href="/">GestIC</Link></Heading> */}
        </Flex>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} initialFocusRef={btnRef} size="md">
          <DrawerOverlay>
            <DrawerContent bg="teal" color="white">
              <DrawerCloseButton top={8} right={4} fontSize="1rem" />
              <DrawerHeader pt={6}>
                <Box top={8} position="absolute">
                  <Link href="/">GestIC</Link>
                </Box>
              </DrawerHeader>
              <DrawerBody
                fontWeight="bold"
                textAlign="center"
                justifyContent="space-between"
                display="flex"
                flexDir="column"
                py={12}
                mt={5}
              >
                <Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/informacoes-uteis">Informações Úteis</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="black" href="/calendario">
                      Calendário
                    </Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/informativos">Informativos</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="black" href="/projetos-ativos">
                      Projetos Ativos
                    </Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link href="/grupos-de-pesquisa">Grupos de Pesquisa</Link>
                  </Box>
                  <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                    <Link color="black" href="/ofertas-disciplinas">
                      Ofertas de Disciplina
                    </Link>
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
      <Flex alignItems="center">
        <Heading size="md" ml={4}>
          <Link href="/">GestIC</Link>
        </Heading>
      </Flex>
      {user && user.id !== '' ? (
        <Box color="teal" zIndex="2">
          <Menu>
            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
              {user.name}
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="/perfil">
                  <span>Ir para perfil</span>
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={signOut}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Link href="/login" _hover={{ textDecoration: 'none' }}>
          <Button color="teal">Login</Button>
        </Link>
      )}
    </SimpleGrid>
  );
};
