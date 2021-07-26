import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useMediaQuery,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import ProjectItem from '../ProjectItem';

interface projectData {
  id: string;
  userId: string;
  name: string;
  description: string;
  researchType: string;
  participants: {
    name: string;
  }[];
  activities: string;
}

const ActiveProjectItemPage = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const [project, setproject] = useState<projectData>({} as projectData);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  // const goToPage = (id: string | number) => {
  //   history.push(`projetos-ativos/show/${id}`);
  // };
  console.log('id', id);

  const getProject = async () => {
    try {
      const { data } = await api.get(`/project/${id}`);

      console.log('data', data);
      setproject(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, [id]);

  const clickToRemove = () => {
    setIsOpen(true);
  };

  const removeProject = () => {
    console.log('Project', project);
    onClose();
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {!(Object.values(project).length > 0) ? (
          <Center flexDirection="column">
            <Heading color="teal" textAlign="center" mb={6}>
              Projeto
            </Heading>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há projeto com esse id.</Text>}
          </Center>
        ) : (
          <>
            <Box
              display="flex"
              mb={10}
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              // ml={6}
              maxW={isLargerThan766 ? '80vw' : '50vw'}
              margin="auto"
            >
              <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent="center">
                <Heading color="teal" textAlign="center" mr={2}>
                  Projeto
                </Heading>
              </Box>
            </Box>
            <Box maxW="80vh" margin="auto">
              <ProjectItem project={project} clickToRemove={clickToRemove} withActions />
            </Box>
          </>
        )}
      </Box>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover Projeto
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja remover o projeto <strong>&quot;{project.name}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={removeProject}>
                Remover
              </Button>
              <Button ref={cancelRef} onClick={onClose} ml={3}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Page>
  );
};

export default ActiveProjectItemPage;
