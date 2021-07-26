import * as React from 'react';
import {
  Box,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Heading,
  InputGroup,
  Input,
  Spinner,
  InputRightElement,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from '../../components/Page';
import { useAuth } from '../../providers/AuthProvider';

import { api } from '../../services/api';

// ProjectsService.getProjects()

interface dataType {
  id: string;
  name: string;
  code: string;
  codeClassroom: string;
  linkClassroom: string;
  linkMeets: string;
  linkWpp: string;
  linkTel: string;
}

const DisciplineOffer = () => {
  const history = useHistory();
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');

  const [disciplines, setADisciplines] = React.useState<dataType[]>([]);
  const [disciplinesSearch, setDisciplinesSearch] = React.useState<dataType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useAuth();

  const getAllDisciplines = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/offer');

      setADisciplines(data);
      setDisciplinesSearch(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getAllDisciplines();
  }, []);

  // const goToPage = (id: string | number) => {
  //   history.push(`ofertas-disciplinas/show/${id}`);
  // };

  const handleChange = event => {
    const { value } = event.target;
    if (disciplines.length) {
      if (value) {
        const newDisciplines = disciplines.filter(discipline => {
          return (
            discipline?.name?.toLowerCase().includes(value.toLowerCase()) ||
            discipline?.code?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setDisciplinesSearch(newDisciplines);
      } else {
        setDisciplinesSearch(disciplines);
      }
    }
  };

  return (
    <Page>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading color="teal" textAlign="center" mr={2}>
              Oferta de Disciplinas
            </Heading>
            {user && (
              <Button
                leftIcon={<AddIcon />}
                onClick={() => history.push('ofertas-disciplinas/new')}
                colorScheme="teal"
                variant="outline"
              >
                Criar novo
              </Button>
            )}
          </Box>

          <Box minW="20%" w="25%" mb={user ? 6 : 0}>
            <InputGroup color="teal">
              <Input placeholder="Buscar" bg="white" onChange={handleChange} />
              <InputRightElement>
                <BsSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>

        {disciplines.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Código</Th>
                <Th>Nome</Th>
                <Th>Código classroom</Th>
              </Tr>
            </Thead>
            <Tbody>
              {disciplinesSearch.map(dicipline => {
                return (
                  <Link key={dicipline.id} as={Tr} href={`ofertas-disciplinas/show/${dicipline.id}`}>
                    <Td>
                      <Link display="block" href={`ofertas-disciplinas/show/${dicipline.id}`}>
                        {dicipline.code}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`ofertas-disciplinas/show/${dicipline.id}`}>
                        {dicipline.name}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`ofertas-disciplinas/show/${dicipline.id}`}>
                        {dicipline.codeClassroom}
                      </Link>
                    </Td>
                  </Link>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Text display="flex" alignItems="center" justifyContent="center">
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há disciplinas cadastradas</Text>}
          </Text>
        )}
      </Box>
    </Page>
  );
};

export default DisciplineOffer;
