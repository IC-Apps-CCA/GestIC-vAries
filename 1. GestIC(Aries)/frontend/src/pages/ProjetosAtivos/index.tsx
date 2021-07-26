import * as React from 'react';
import {
  useToast,
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
  InputRightElement,
  Text,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from '../../components/Page';
import { useAuth } from '../../providers/AuthProvider';

import { api } from '../../services/api';

interface dataType {
  id: string;
  userId: string;
  name: string;
  description: string;
}

const ProjetosAtivos = () => {
  const history = useHistory();
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');

  const [activeProjects, setActiveProjects] = React.useState<dataType[]>([]);
  const [activeProjectsSearch, setActiveProjectsSearch] = React.useState<dataType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useAuth();

  const toast = useToast();

  const getAllActiveProjects = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/project');

      setActiveProjects(data);
      setActiveProjectsSearch(data);
    } catch (err) {
      toast({
        title: 'Ocorreu um erro ao carregar os dados na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getAllActiveProjects();
  }, [toast]);

  const handleChange = event => {
    const { value } = event.target;
    if (activeProjects.length) {
      if (value) {
        const newActiveProjects = activeProjects.filter(project => {
          return (
            project?.name?.toLowerCase().includes(value.toLowerCase()) ||
            project?.description?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setActiveProjectsSearch(newActiveProjects);
      } else {
        setActiveProjectsSearch(activeProjects);
      }
    }
  };

  return (
    <Page>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading color="teal" textAlign="center" mr={2}>
              Projetos Ativos
            </Heading>
            {!isLoading && user && (
              <Button
                leftIcon={<AddIcon />}
                onClick={() => history.push('projetos-ativos/new')}
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
        {activeProjects.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Descrição</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activeProjectsSearch.map(project => {
                return (
                  <Link key={project.id} as={Tr} href={`projetos-ativos/show/${project.id}`}>
                    <Td>
                      <Link display="block" href={`projetos-ativos/show/${project.id}`}>
                        {project.name}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`projetos-ativos/show/${project.id}`}>
                        {project.description}
                      </Link>
                    </Td>
                  </Link>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Text display="flex" alignItems="center" justifyContent="center">
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há projetos ativos cadastrados.</Text>}
          </Text>
        )}
      </Box>
    </Page>
  );
};

export default ProjetosAtivos;
