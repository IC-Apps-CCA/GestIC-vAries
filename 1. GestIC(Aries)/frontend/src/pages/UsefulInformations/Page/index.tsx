import * as React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Link,
  useMediaQuery,
} from '@chakra-ui/react';
import { Page } from '../../../components/Page';
import { useHistory } from 'react-router-dom';

const UsefulInformationPage = () => {
  const [isSmallerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();

  return (
    <Page>
      <Box p={8} pt={isSmallerThan766 ? 10 : 8} color="teal" maxW={isSmallerThan766 ? '100%' : '60vw'}>
        <Heading mb={6}>Informações Úteis</Heading>
        <Box mb={2} pl={2}>
          <Link href="/informacoes-uteis/lista-emails">Lista de E-mails do IC</Link>
        </Box>
        <Box>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton pl={2}>
                  <Box flex="1" textAlign="left">
                    Projetos Pedagógicos
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} pl={2}>
                <Flex flexDirection={isSmallerThan766 ? 'column' : 'row'}>
                  <Link
                    href="https://ic.ufal.br/graduacao/ciencia-da-computacao/documentos/projeto-pedagogico"
                    target="_blank"
                    fontWeight="bolder"
                    mr={2}
                  >
                    Ciência da Computação
                  </Link>
                </Flex>
                <Flex flexDirection={isSmallerThan766 ? 'column' : 'row'}>
                  <Link
                    href="https://ic.ufal.br/graduacao/engenharia-de-computacao/documentos/projeto-pedagogico"
                    target="_blank"
                    fontWeight="bolder"
                    mr={2}
                  >
                    Engenharia de Computação
                  </Link>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Page>
  );
};

export default UsefulInformationPage;
