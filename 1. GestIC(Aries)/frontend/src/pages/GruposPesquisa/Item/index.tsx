import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useMediaQuery,
  Center,
  Spinner,
  Link,
  Table,
  Tbody,
  Tr,
  Td,
  useToast,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { BsTrashFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { useAuth } from '../../../providers/AuthProvider';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';

const GruposPesquisaItemPage = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const [researchGroup, setResearchGroup] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const getResearchGroup = async () => {
    try {
      const { data } = await api.get(`/research/${id}`);

      setResearchGroup(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getResearchGroup();
  }, [id]);

  const clickToRemove = () => {
    setIsOpen(true);
  };

  const removeInformative = async () => {
    await api.delete(`/research/${id}`);

    toast({
      title: 'Grupo de pesquisa removido com sucesso',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    history.push('/grupos-de-pesquisa');

    onClose();
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {!researchGroup ? (
          <Center flexDirection="column">
            <Heading color="teal" textAlign="center" mb={6}>
              Grupo de Pesquisa
            </Heading>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há grupo de pesquisa com esse id.</Text>}
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
                  Grupo de Pesquisa
                </Heading>
              </Box>
            </Box>
            <Box maxW="80vh" margin="auto">
              <ResearchGroupItem researchGroup={researchGroup} clickToRemove={clickToRemove} />
            </Box>
          </>
        )}
      </Box>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover Informativo
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja remover o grupo de pesquisa <strong>&quot;{researchGroup.name}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={removeInformative}>
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

export const ResearchGroupItem = ({ researchGroup, clickToRemove = () => {}, withActions = true }) => {
  const history = useHistory();
  const { user } = useAuth();
  const { id } = useParams();

  return (
    <Box mt={4} mb={8}>
      <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
        <Heading>{researchGroup.name}</Heading>
        {user && withActions && (
          <Box>
            <IconButton
              variant="outline"
              colorScheme="blue"
              aria-label="Editar"
              mr={2}
              icon={<MdModeEdit />}
              onClick={() => history.push(`/grupos-de-pesquisa/edit/${id}`)}
            />
            <IconButton
              variant="outline"
              colorScheme="red"
              aria-label="Remover"
              onClick={clickToRemove}
              icon={<BsTrashFill />}
            />
          </Box>
        )}
      </Box>
      <Box mt={2} textAlign="left">
        <Text fontSize="22px">{researchGroup.description}</Text>
      </Box>

      <Box mt={3} textAlign="left">
        <Text fontSize="18px">
          <b>Tipo de pesquisa: </b>
          {researchGroup.researchType}
        </Text>
      </Box>

      <Box mt={3} textAlign="left">
        <Text fontSize="18px">
          <b>Atividades e objetivos: </b>
          {researchGroup.activities}
        </Text>
      </Box>

      <Box mt={3} textAlign="left">
        <Text fontSize="18px">
          <div>
            <b>Participantes: </b>
          </div>
          {researchGroup.participants && researchGroup.participants.length !== 0 ? (
            <Table variant="simple">
              <Tbody>
                {researchGroup.participants.map(student => {
                  return (
                    <Tr key={student.name}>
                      <Td>{student.name}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <Text>Não há alunos participando deste projeto ainda.</Text>
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default GruposPesquisaItemPage;
