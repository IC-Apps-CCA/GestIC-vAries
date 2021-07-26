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
  useToast,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import { BsTrashFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';

const InformativeItemPage = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const [informative, setInformative] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const getInformative = async () => {
    try {
      const { data } = await api.get(`/informative/${id}`);
      if (data) {
        setInformative(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInformative();
  }, [id]);

  const clickToRemove = () => {
    setIsOpen(true);
  };

  const removeInformative = async () => {
    try {
      await api.delete(`/informative/${informative.id}`)
      toast({
        title: 'Informativo deletado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      history.push('/informativos');
    } catch {
      toast({
        title: 'Ocorreu um erro ao criar um novo informativo na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    } finally {

      onClose();
    }
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {!(Object.values(informative).length > 0) ? (
          <Center flexDirection="column">
            <Heading color="teal" textAlign="center" mb={6}>
              Informativo
            </Heading>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há informativo com esse id.</Text>}
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
                  Informativo
                </Heading>
              </Box>
            </Box>
            <Box maxW="80vh" margin="auto">
              <InformativeItem informative={informative} clickToRemove={clickToRemove} />
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
              Tem certeza que deseja remover o informativo <strong>&quot;{informative.title}&quot;</strong>?
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

export const InformativeItem = ({ informative, clickToRemove = () => {}, withActions = true }) => {
  const history = useHistory();
  const { user } = useAuth();

  const goToPage = (id: string | number) => {
    // history.push(`projetos-ativos/show/${id}`);
  };

  return (
    <Box mt={4} mb={8}>
      <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
        <Heading color="teal" onClick={() => history.push(`informativos/show/${informative.id}`)}>
          <Link>{informative.title}</Link>
        </Heading>
        {user && withActions && (
          <Box>
            <IconButton variant="outline" onClick={() => history.push(`informativos/edit/${informative.id}`)} colorScheme="blue" aria-label="Editar" mr={2} icon={<MdModeEdit />} />
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
      <Box textAlign="left">{informative.content}</Box>
    </Box>
  );
};

export default InformativeItemPage;
