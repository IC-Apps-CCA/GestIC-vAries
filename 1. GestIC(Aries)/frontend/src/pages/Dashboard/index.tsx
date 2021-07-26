import * as React from 'react';
import { Box, SimpleGrid, Icon, Heading, Link, useMediaQuery } from '@chakra-ui/react';
import { AiOutlineFundProjectionScreen, AiOutlineUnorderedList } from 'react-icons/ai';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BiGroup } from 'react-icons/bi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Informative from '../../components/Informative';
import { Page } from '../../components/Page';

const Dashboard = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');

  return (
    <Page>
      <Box textAlign="center" fontSize="xl" p={8}>
        <SimpleGrid columns={[1, null, 2]} minH="100%" spacing={8} justifyItems="center">
          <Informative />
          {!isLargerThan766 && (
            <Box w="70%">
              <Link color="teal" href="/informacoes-uteis" _focus={{ boxShadow: 'none' }}>
                <Box border="1px" p={4} display="flex" alignItems="center" justifyContent="center" mb={2}>
                  <Icon as={IoMdInformationCircleOutline} fontSize="2rem" mr={2} />
                  <Heading fontSize="md" textTransform="uppercase">
                    Informações Úteis
                  </Heading>
                </Box>
              </Link>
              <Link color="white" href="/calendario" _focus={{ boxShadow: 'none' }}>
                <Box mb={2} p="1px" bgColor="teal">
                  <Box
                    border="1px"
                    bgColor="teal"
                    borderColor="white"
                    p={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FaRegCalendarAlt} fontSize="1.6rem" mr={3} />
                    <Heading fontSize="md" textTransform="uppercase">
                      Calendário
                    </Heading>
                  </Box>
                </Box>
              </Link>
              <Link color="teal" href="/projetos-ativos" _focus={{ boxShadow: 'none' }}>
                <Box border="1px" p={4} display="flex" alignItems="center" justifyContent="center" mb={2}>
                  <Icon as={AiOutlineFundProjectionScreen} fontSize="2rem" mr={2} />
                  <Heading fontSize="md" textTransform="uppercase">
                    Projetos Ativos
                  </Heading>
                </Box>
              </Link>
              <Link color="white" href="/grupos-de-pesquisa" _focus={{ boxShadow: 'none' }}>
                <Box mb={2} p="1px" bgColor="teal">
                  <Box
                    border="1px"
                    bgColor="teal"
                    borderColor="white"
                    p={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={BiGroup} fontSize="2rem" mr={2} />
                    <Heading fontSize="md" textTransform="uppercase">
                      Grupos de Pesquisa
                    </Heading>
                  </Box>
                </Box>
              </Link>
              <Link color="teal" href="/ofertas-disciplinas" _focus={{ boxShadow: 'none' }}>
                <Box border="1px" p={4} display="flex" alignItems="center" justifyContent="center" mb={2}>
                  <Icon as={AiOutlineUnorderedList} fontSize="2rem" mr={2} />
                  <Heading fontSize="md" textTransform="uppercase">
                    Ofertas de disciplina
                  </Heading>
                </Box>
              </Link>
            </Box>
          )}
        </SimpleGrid>
      </Box>
    </Page>
  );
};

export default Dashboard;
